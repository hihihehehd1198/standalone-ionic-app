import { FormBuilder } from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ServiceItem } from '../pages/servicePage/store/servicePage.types';

const CREATE_SERIVCE = gql`
  mutation createServiceShop($ServiceShopDTO: ServiceShopDTO!) {
    createServiceShop(body: $ServiceShopDTO) {
      id
      price
      name
    }
  }
`;

const UPDATE_SERVICE = gql`
  mutation updateServiceShop($ServiceShopDTO: ServiceShopDTO!) {
    updateServiceShop(body: $ServiceShopDTO) {
      id
      price
      name
    }
  }
`;

const GET_LIST_SERVICE = gql`
  query getServiceShop {
    getServiceShop {
      id
      name
      price
    }
  }
`;
const DELETE_SERVICE = gql`
  mutation deleteServiceShop($id: [Int!]!) {
    deleteServiceShop(id: $id) 
  }
`;
@Injectable()
export class SerivceManager {
  apolloService = inject(Apollo);

  getListService(): Observable<any> {
    return this.apolloService.mutate({
      mutation: GET_LIST_SERVICE,
    });
  }

  updateService(serivceItem: ServiceItem): Observable<any> {
    return this.apolloService.mutate({
      mutation: UPDATE_SERVICE,
      variables: {
        ServiceShopDTO: serivceItem,
      },
    });
  }

  deleteService(id: number[] = []): Observable<any> {
    return this.apolloService.mutate({
      mutation: DELETE_SERVICE,
      variables: {
        id,
      },
    });
  }

  createService(serviceItem: ServiceItem): Observable<any> {
    return this.apolloService.mutate({
      mutation: CREATE_SERIVCE,
      variables: {
        ServiceShopDTO: serviceItem,
      },
    });
  }
}
