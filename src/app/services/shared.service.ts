import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, of } from 'rxjs';

const UPLOAD_FILE_QUERY = gql`
mutation uploadFile($FileUploadDTO:FileUploadDTO!){
    uploadFile(data:$FileUploadDTO)
}
`;

const GET_FILE_UPLOAD_NAME = gql`
mutation getURLS3($fileName:String!){
    getURLS3(fileName:$fileName)
}`;

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private apolloService = inject(Apollo);

    uploadFileS3(data: { file: string; fileName: string }): Observable<any> {
        return this.apolloService.mutate({
            mutation: UPLOAD_FILE_QUERY,
            variables: {
                FileUploadDTO: { ...data },
            },
        });
    }

    getUrlS3(fileName: string): Observable<any> {
        return this.apolloService.mutate({
            mutation: GET_FILE_UPLOAD_NAME,
            variables: {
                fileName,
            },
        });
        // return of(null)
    }
}
