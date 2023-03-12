import { Injectable, inject } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { map, NEVER, Observable, of, switchMap } from 'rxjs';
import { ArticleItem } from '../pages/article/store/article.reducer';



const UPVOTE_POST = gql`
mutation signin($signInInput: SignInInput!) {
  signin(signInInput: $signInInput) {
    accessToken
    refreshToken
  }
}
`;

// mutation{
//   createArticle(data:{
//     body:"1234",
//     title:"12345"
//   })
//   {
//     response
//   }
// }
const DELETE_ARTICLE = gql`
mutation deleteArticle($id:[Int!]!){
  deleteArticle(id:$id){
    response
  }
}`

const UPDATE_ARTICLE = gql`
mutation updateArticle($id:Int!,$body:String!, $title:String!){
  updateArticle(data:{
    body:$body,
    title:$title,
    id:$id,
  }){
    response
  }
}
`
const CREATE_ARTICLE = gql`
mutation createArticle($body:String!, $title:String!){
  createArticle(data:{
    body:$body,
    title:$title
  }){
    response
  }
}
`


@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  apolloService = inject(Apollo);
  // constructor(private apolloService: Apollo) {}

  /**get list article from Graphql API  */
  getListArticle(id?: string[] | null): Observable<any> {
    console.log('call api ? ')
    return this.apolloService.mutate({
      mutation: gql`
        query {
          getArticle(id:null) {
            id
            body
            title
          }
        }
      `,
    });
  }

  createArticle(form: ArticleItem): Observable<any> {
    // const req = this.apolloService.watchQuery({
    //   query: gql`
    //     mutation {
    //       createArticle(data: { body: "asdasdasd", title: "ahgschjdkjfvh" }) {
    //         response
    //       }
    //     }
    //   `,
    // });
    // return of(null);


    return this.apolloService.mutate({
      mutation: CREATE_ARTICLE,
      variables: {
        body: form.body,
        title: form.title
      }
    })
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


  deleteArticle(id: number[] = []): Observable<any> {
    const req = this.apolloService.mutate({
      mutation: DELETE_ARTICLE,
      variables: {
        id: id
      }
    })
    return req
  }


  updateArticle(article: ArticleItem): Observable<any> {
    return this.apolloService.mutate({
      mutation: UPDATE_ARTICLE,
      variables: {
        id: article.id,
        body: article.body,
        title: article.title
      }
    })
  }





  
}
