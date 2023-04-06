import { Apollo, gql } from 'apollo-angular';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerItem } from '../pages/customer/store/customer.types';

const CREATE_CUSTOMER = gql`
  mutation createCustomerAccount($CustomerDto: CustomerDto!) {
    createCustomerAccount(body: $CustomerDto) {
      id
      name
      email
      accountName
      PhoneNumber
      hashedPassword
      address
    }
  }
`;

const UPDATE_CUSTOMER = gql`
  mutation updateCustomerAccount($CustomerDto: CustomerDto!) {
    updateCustomerAccount(body: $CustomerDto) {
      id
      name
      email
      accountName
      PhoneNumber
      hashedPassword
      address
    }
  }
`;

const DELETE_CUSTOMER = gql`
  mutation deleteCustomerAccount($id: [Int!]!) {
    deleteCustomerAccount(id: $id)
  }
`;

const GET_LIST_CUSTOMER = gql`
  query listCustomerAccount {
    listCustomerAccount {
      id
      PhoneNumber
      id
      email
      accountName
      name
      hashedPassword
      address
    }
  }
`;

Injectable();
export class CustomerManagerService {

  private apolloService = inject(Apollo)
  getListCustomer(): Observable<any> {
    return this.apolloService.mutate({
      mutation: GET_LIST_CUSTOMER,
    })
  }

  updateCustomer(customerItem: CustomerItem): Observable<any> {
    return this.apolloService.mutate({
      mutation: UPDATE_CUSTOMER,
      variables: {
        CustomerDto: customerItem
      }
    })
  }

  createCustomer(customerItem: CustomerItem): Observable<any> {
    return this.apolloService.mutate({
      mutation: CREATE_CUSTOMER,
      variables: {
        CustomerDto: customerItem
      }
    })
  }

  deleteCustomer(id: number[]): Observable<any> {
    return this.apolloService.mutate({
      mutation: DELETE_CUSTOMER,
      variables: {
        id
      }
    })
  }

}
