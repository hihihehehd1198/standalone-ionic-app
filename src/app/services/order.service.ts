import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_LIST_ORDER = gql`
  query getOrder {
    getOrder {
      id
      orderStatus
      customerName
      paymentStatus
    }
  }
`;
const GET_LIST_ORDER_DETAIL = gql`
  query getOrder($id: Int!) {
    getOrder(id: $id) {
      id
      orderStatus
      customerName
      paymentStatus
      productOrder {
        id
        name
        count
        price
      }
    }
  }
`;


const DELETE_ORDER_DETAIL = gql`
mutation deleteOrder($listId:[Int!]!){
  deleteOrder(listId:$listId)
}
`

@Injectable()
export class OrderService {
    apollo = inject(Apollo)
    deleteOrder(id: number[]) {
        return this.apollo.mutate({
            mutation: DELETE_ORDER_DETAIL,
            variables: {
                listId: id
            }
        })
    }

    getListOrder() {
        return this.apollo.mutate({
            mutation: GET_LIST_ORDER,
        })
    }

    getOrderDetail(id: number) {
        return this.apollo.mutate({
            mutation: GET_LIST_ORDER_DETAIL,
            variables: {
                id
            }
        })
    }

}   
