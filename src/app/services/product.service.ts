import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const FIND_PRODUCT_QUERY = gql`
query {
    findProduct{
        id
        name
        count
        price
        location
    }
}
`;

const FIND_PRODUCT_QUERY_DETAIL = gql`
  query findProduct($id: Number!) {
    findProduct(id: $id) {
      id
      name
      location
      count
      price
      Category {
        id
        name
        status
      }
      Brand {
        id
        brandName
        status
      }
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation createProduct($data: data!) {
    createProduct(data: $data) {
      id
      count
      price
      name
      location
    }
  }
`;


const UPDATE_PRODUCT = gql`
  mutation updateProduct($data: data!) {
    updateProduct(data: $data) {
      id
      count
      price
      name
      location
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: [Int!]!) {
    deleteProduct(id: $id)
  }
`;

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    apollo = inject(Apollo);

    getProductList(id?: number) {
        return id
            ? this.apollo.mutate({
                mutation: FIND_PRODUCT_QUERY,
            })
            : this.apollo.mutate({
                mutation: FIND_PRODUCT_QUERY_DETAIL,
            });
    }
    updateProductList(product: any) {
        return this.apollo.mutate({
            mutation: UPDATE_PRODUCT,
            variables: {
                data: product
            }
        });
    }

    createProductList(product: any) {
        return this.apollo.mutate({
            mutation: CREATE_PRODUCT,
            variables: {
                data: product
            }
        });
    }
    deleteProduct(id: number[]) {
        return this.apollo.mutate({
            mutation: DELETE_PRODUCT,
            variables: {
                id: [...id]
            }
        })
    }
}
