import { Injectable, inject } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { map, NEVER, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  apolloService = inject(Apollo);

  // constructor(private apolloService: Apollo) {}

  /**get list article from Graphql API  */
  getListArticle(id?: string[]): Observable<any> {
    return this.apolloService.watchQuery({
      query: gql`
        query {
          getArticle(id: null) {
            id
            body
            title
          }
        }
      `,
    }).valueChanges;
  }

  createArticle(): Observable<any> {
    const req = this.apolloService.watchQuery({
      query: gql`
        mutation {
          createArticle(data: { body: "asdasdasd", title: "ahgschjdkjfvh" }) {
            response
          }
        }
      `,
    });
    return of(null);
  }
  login(form: { username: string; password: string }): Observable<any> {
    // const gqlQuery = ;
    // const req = this.apolloService
    //   .watchQuery({ query: gqlQuery })
    //   .valueChanges.pipe(
    //     switchMap(({ query: any }) => {
    //       const customerid = query
    //       const customerInfo =
    //       return NEVER;
    //     })
    //   )
    //   .subscribe();
    const dataBody = {
      email: 'nem@gmail.com',
      password: 'a12345',
    };

    const UPVOTE_POST = gql`
      mutation signin($signInInput: SignInInput!) {
        signin(signInInput: $signInInput) {
          accessToken
          refreshToken
        }
      }
    `;

    const req = this.apolloService.mutate({
      mutation: UPVOTE_POST,
      variables: {
        signInInput: {
          email: dataBody.email,
          password: dataBody.password,
        },
      },
    });
    return req;
  }
}
