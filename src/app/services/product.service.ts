import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const FIND_PRODUCT_QUERY = gql`
  query {
    findProduct {
      id
      name
      count
      price
      location
      Category {
        id
        name
      }
      Brand {
        id
        brandName
      }
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
  mutation createProduct($ProductBodyDTO: ProductBodyDTO!) {
    createProduct(body: $ProductBodyDTO) {
      id
      name
      count
      price
      location
      Category {
        id
        name
      }
      Brand {
        id
        brandName
      }
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation updateProduct($ProductBodyDTO: ProductBodyDTO!) {
    updateProduct(body: $ProductBodyDTO) {
      id
      name
      count
      price
      location
      Category {
        id
        name
      }
      Brand {
        id
        brandName
      }
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
    return !id
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
        ProductBodyDTO: product,
      },
    });
  }

  createProductList(product: any) {
    return this.apollo.mutate({
      mutation: CREATE_PRODUCT,
      variables: {
        ProductBodyDTO: product,
      },
    });
  }
  deleteProduct(id: number[]) {
    return this.apollo.mutate({
      mutation: DELETE_PRODUCT,
      variables: {
        id: [...id],
      },
    });
  }
}
