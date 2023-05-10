import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { map, NEVER, Observable, of, switchMap } from 'rxjs';

interface UserLogin {
    email: string,
    password: string
}
const LOGIN_QUERY = gql`
mutation signin($email:String!, $password:String!){
    signin(signInInput: {
        email:$email,
        password:$password,
    }){
    accessToken,
    refreshToken,
    }
}
`
@Injectable({
    providedIn: "root",
})

export class LoginService {
    apollo = inject(Apollo)
    router = inject(Router)
    logOutAction() {
        localStorage.clear()
    }
    submitLogin(form: UserLogin): Observable<any> {
        console.log(form)
        return this.apollo.mutate({
            mutation: LOGIN_QUERY,
            variables: {
                email: form.email,
                password: form.password
            },

        })

        // .subscribe({
        //     next: (res: any) => {
        //         const checkToken = localStorage.getItem('accessToken')
        //         if (!checkToken) {
        //             localStorage.setItem('accessToken', res.data['signin']['accessToken'])
        //         }
        //         this.router.navigateByUrl('/Pages')
        //     },
        //     error: (err) => { console.log(err) },
        //     complete: () => {
        //         console.log('complete')
        //     }
        // })
    }
}