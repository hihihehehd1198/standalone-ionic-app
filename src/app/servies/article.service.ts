import { Injectable, inject } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'any',
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
}
