import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CategoryItem } from '../pages/category/store/category.types';

const GET_LIST_CATEGORY = gql`
  query getCategory {
    getCategory {
      id
      status
      name
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation updateCategory($CategoryDTO: CategoryDTO!) {
    updateCategory(body: $CategoryDTO) {
      id
      name
      status
    }
  }
`;

const CREATE_CATEGORY = gql`
  mutation createCategory($CategoryDTO: CategoryDTO!) {
    createCategory(body: $CategoryDTO) {
      id
      name
      status
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: [Int!]!) {
    deleteCategory(id: $id)
  }
`;

@Injectable()
export class CategoryService {
  private apolloService = inject(Apollo);
  getListCategory(): Observable<any> {
    return this.apolloService.mutate({
      mutation: GET_LIST_CATEGORY,
    });
  }

  updateCategory(categoryItem: CategoryItem): Observable<any> {
    return this.apolloService.mutate({
      mutation: UPDATE_CATEGORY,
      variables: {
        CategoryDTO: categoryItem,
      },
    });
  }

  createCategory(categoryItem: Omit<CategoryItem, 'id'>): Observable<any> {
    return this.apolloService.mutate({
      mutation: CREATE_CATEGORY,
      variables: {
        CategoryDTO: categoryItem,
      },
    });
  }

  deleteCategory(id: number[]): Observable<any> {
    return this.apolloService.mutate({
      mutation: DELETE_CATEGORY,
      variables: {
        id,
      },
    });
  }
}
