import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { BranchItem } from '../pages/branch/store/branch.types';

const CREATE_BRAND = gql`
mutation createBrand($BrandDto:BrandDto!){
    createBrand(body:$BrandDto){
        response
    }
}`;
const DELETE_BRAND = gql`
mutation 
  deleteBrand($id:[Int!]!){
    deleteBrand(id:$id){
        response
    }
  }
`;

const GET_BRAND = gql`
  query {
    getAllBrand {
      id
      status
      brandName
    }
  }
`;

const UPDATE_BRAND = gql`
mutation updateBrand($BrandDto:BrandDto!){
    updateBrand(body:$BrandDto){
        response
    }
}
`;

@Injectable({
    providedIn: 'platform'
})
export class BrandService {
    apolloService = inject(Apollo);

    getBrand(): Observable<any> {
        return this.apolloService.mutate({
            mutation: GET_BRAND,
        });
    }
    updateBrand(data: BranchItem): Observable<any> {
        return this.apolloService.mutate({
            mutation: UPDATE_BRAND,
            variables: {
                BrandDto: {
                    ...data
                }
            }
        })
    }
    createBrand(data: BranchItem): Observable<any> {
        return this.apolloService.mutate({
            mutation: CREATE_BRAND,
            variables: {
                BrandDto: {
                    ...data
                }
            }
        })
    }
    deleteBrand(id: number[]): Observable<any> {
        return this.apolloService.mutate({
            mutation: DELETE_BRAND,
            variables: {
                id: [...id]
            }
        })
    }
}
