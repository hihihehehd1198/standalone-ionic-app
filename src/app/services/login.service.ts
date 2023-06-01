import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { map, NEVER, Observable, of, switchMap } from 'rxjs';

interface UserLogin {
    email: string,
    password: string
}
export interface userLogin {
    password: string
    email: string
    username: string
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

const LOGIN_FIREBASE = gql`
mutation checkUserLoginFirebase($signInInput:LoginFirebaseInput!){
  checkUserLoginFirebase(signInInput:$signInInput){
    accessToken
    refreshToken
    requireChangePassword
  }
}
`

const SIGNUP_QUERY = gql`
mutation($signUpInput:SignUpInput!){
signup(signUpInput:$signUpInput){
  accessToken
  refreshToken
}}
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
    signUp(user: UserLogin) {
        return this.apollo.mutate({
            mutation: SIGNUP_QUERY,
            variables: {
                signUpInput: { ...user }
            }
        })
    }

    loginFirebase(user: {
        email: string,
        userName: string,
    }) {
        return this.apollo.mutate({
            mutation: LOGIN_FIREBASE,
            variables: {
                signInInput: { ...user }
            }
        })
    }

    setStorageLogin(accessToken: string) {
        localStorage.setItem('accessToken', accessToken)
    }
}