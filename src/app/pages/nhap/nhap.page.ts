import { HttpClientModule } from '@angular/common/http';
// import { getMessaging } from 'firebase/messaging';
import { environment } from './../../../environments/environment';
import { CommonModule } from '@angular/common';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  inject,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  BehaviorSubject,
  debounceTime,
  defer,
  interval,
  Observable,
  Subject,
  take,
  tap,
  timer,
} from 'rxjs';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../environment';

@Component({
  selector: 'app-root',
  templateUrl: 'nhap.page.html',
  styleUrls: ['nhap.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NhapComponent implements AfterViewInit {
  listStreamData = new Subject();
  httpclient = inject(HttpClient);
  listStreamDataSubj = new BehaviorSubject(0);
  title = 'af-notification';
  message = '';
  messagingCloudService = inject(AngularFireMessaging);
  tokenFirebaseMessaging = new BehaviorSubject<string>('');
  constructor() {
    this.getTokenRequest();
    this.listen();
  }
  ngAfterViewInit(): void {
    let time = 0;
    // timer(0, 200).pipe(
    //     debounceTime(200),
    //     // tap((x: any) => this.listStreamData.next(time++)),

    // ).subscribe(y => console.log("ob1", y))

    // // , tap((x: number) => console.log('ob2', x))
    // interval(200).pipe(debounceTime(200)).subscribe((y: number) => console.log('ob2:', y))
    this.listStreamData.next(2);
    this.listStreamDataSubj.next(2);
    this.listStreamData.pipe(tap((x) => console.log('subj', x))).subscribe();
    this.listStreamDataSubj
      .pipe(tap((x) => console.log('behaviour', x)))
      .subscribe();
    console.log('3');

    //interval : hết time mới chạy
    //timer : chạy ngay lập tức
  }

  getTokenRequest() {
    const messaging = getMessaging();
    getToken(messaging, {
      vapidKey:
        'BEkh9Z6npt9j4OQAu0X3On_-b-w1jtry0l8xW2FJSuECFBMVblUAbrKoq2vhF04LWLd6k7oby2apta6aAQRilSs',
    })
      .then((token) => {
        token
          ? console.log('got token', token)
          : console.log('cannot find token');

        this.tokenFirebaseMessaging.next(token || '');
      })
      .catch((err) => {
        console.log('bug when get token ', err);
      });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload: any) => {
      console.log('message received ', payload);
      this.message = payload;
    });
  }
  sendMessage(e: any) {
    if (e.code.toString().toLowerCase() === 'enter') {
      console.log('testing ', e.target.value);

      if (this.tokenFirebaseMessaging.getValue().length) {
        this.sendMessageResponse(
          { text: 'testing', body: e.target.value },
          this.tokenFirebaseMessaging.getValue()
        )
          .pipe(tap((res) => console.log('res', res)))
          .subscribe();
      }
      e.target.value = '';
    }
  }
  sendMessageResponse(
    param: { text: string; body: string },
    token?: string
  ): Observable<any> {
    const url =
      'https://fcm.googleapis.com/v1/projects/thoikhoabieu-a5075/messages:send';
    const bodyData = {
      message: {
        token,
        notification: {
          title: param?.text,
          body: param?.body,
        },
        webpush: {
          headers: {
            Urgency: 'high',
          },
          notification: {
            body: 'This is a message from FCM to web',
          },
        },
      },
    };
    const header = new HttpHeaders();

    // header.set('Content-Type', 'application/json');
    header.set(
      'authorization',
      'Bearer ya29.a0AVvZVsosHo7Z7PrNzeD9rKd8PZSWMRbYiSVprn4r-vPD0bpOMA0eetwwJf1OGJlUCjLVQk88REVgcxkb9WVNe6EXx7fLPrl3VU_KrDbi14OQtmzHj6fpr45_HNEcrgyMHdkunuhOHTbhmtuXEAAQTg3LhH_bFXYraCgYKAZwSAQASFQGbdwaIHTMNMB7Gsx3j51wg8MW7hA0167'
    );
    return this.httpclient.post(url, bodyData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ya29.a0AVvZVspJ3L-g8tV3_BKhunjq6PSrO8pQlDxxF4WOJSRMbDzgofPqFZ4aAbg9nArtk5Cu-NQSf911tzw_F0cbVmTdvaKkjg0CeOSWSsqX6KqdtLocgXrMafHtBAMxusgrpD0jTg1sUY4yiBeCyA9RjXxuReFWKrEaCgYKAeoSAQASFQGbdwaISNnRjAzCd9hviaHddv5Y_w0166',
      },
    });
  }
}
