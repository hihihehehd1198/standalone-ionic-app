import { inject, Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import { BannerItem } from '../pages/bannerPage/store/bannerPage.types';

const GET_LIST_BANNER = gql`
  query {
    getAllBanner {
      id
      userId
      status
      urlImg
      location
      updatedAt
      createdAt
    }
  }
`;

// mutation{
//     updateBanner(body:{
//     id: 1,
//           userId: 1,
//           status: false,
//           urlImg: "test",
//           location: "vn",
//     }){
//        id
//       userId
//       status
//       urlImg
//       location
//       updatedAt
//       createdAt
//     }
//   }

const UPDATE_BANNER = gql`
  mutation updateBanner($BannerDto: BannerDto!) {
    updateBanner(body: $BannerDto) {
      id
      userId
      status
      urlImg
      location
      updatedAt
      createdAt
    }
  }
`;


const CREATE_BANNER = gql`
  mutation createBanner($BannerDto: BannerDto!) {
    createBanner(body: $BannerDto) {
      id
      userId
      status
      urlImg
      location
      updatedAt
      createdAt
    }
  }
`;
const DELETE_BANNER = gql`
mutation deleteBanner($id:[Int!]!){
  deleteBanner(id:$id)
}
`

@Injectable()
export class BannerService {
  private apolloService = inject(Apollo);
  getAllBanner(): Observable<any> {
    return this.apolloService.mutate({
      mutation: GET_LIST_BANNER,
    });
  }

  updateBanner(data: BannerItem): Observable<any> {
    return this.apolloService.mutate({
      mutation: UPDATE_BANNER,
      variables: {
        BannerDto: { ...data }
      }
    });
  }

  createBanner(data: BannerItem): Observable<any> {
    return this.apolloService.mutate({
      mutation: CREATE_BANNER,
      variables: {
        BannerDto: { ...data }
      }
    })
  }

  deleteBanner(id: number[]): Observable<any> {
    return this.apolloService.mutate({
      mutation: DELETE_BANNER,
      variables: {
        id,
      }
    })
  }
}
