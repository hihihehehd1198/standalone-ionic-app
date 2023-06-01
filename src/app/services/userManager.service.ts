import { UserInfo } from './../pages/LoginPage/UserStore/user.type';
import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, of } from 'rxjs';

const CREATE_USER = gql`
  mutation signup($SignUpInput: SignUpInput!) {
    signup(signUpInput: $SignUpInput) {
      user {
        id
        username
        Role
        email
        PhoneNumber
        hashedPassword
      }
    }
  }
`;
const GET_LIST_USER = gql`
  query listUser {
    listUser {
      id
      username
      Role
      email
      PhoneNumber
      hashedPassword
    }
  }
`;

// const RESET_PASSWORD = gql`
//   mutation updateUser($UserUpdateDto: UserUpdateDto!) {
//     updateUser(user: $UserUpdateDto) {
//       id
//       username
//       hashedPassword
//     }
//   }
// `;
const CHANGE_PASSWORD = gql`
mutation changePassword($user: UserUpdatePassDto!){
  changePassword(user:$user)
}
`

const UPDATE_USER = gql`
  mutation updateUser($UserUpdateDto: UserUpdateDto!) {
    updateUser(user: $UserUpdateDto) {
      id
      username
      Role
      email
      PhoneNumber
      hashedPassword
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: [Int!]!) {
    deleteUser(id: $id)
  }
`;

@Injectable()
export class UserManagerService {
  private apolloService = inject(Apollo);
  getListUser(): Observable<any> {
    return this.apolloService.mutate({
      mutation: GET_LIST_USER,
    });
    // return of(null)
  }
  updateUser(data: UserInfo): Observable<any> {
    return this.apolloService.mutate({
      mutation: UPDATE_USER,
      variables: {
        UserUpdateDto: { ...data },
      },
    });
  }
  createUser(
    data: Pick<UserInfo, 'email' | 'password' | 'username'>
  ): Observable<any> {
    return this.apolloService.mutate({
      mutation: CREATE_USER,
      variables: {
        SignUpInput: data,
      },
    });
  }
  deleteUser(id: number[]): Observable<any> {
    return this.apolloService.mutate({
      mutation: DELETE_USER,
      variables: {
        id,
      },
    });
  }

  changePassword(user: {
    email: string,
    password: string
  }) {
    return this.apolloService.mutate({
      mutation: CHANGE_PASSWORD,
      variables: {
        user
      }
    })
  }
}
