import { environment } from './../../../environments/environment';
import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  BehaviorSubject,
  debounceTime,
  defer,
  interval,
  Subject,
  take,
  tap,
  timer,
} from 'rxjs';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// import { environment } from '../environment';

@Component({
  selector: 'app-root',
  templateUrl: 'nhap.page.html',
  styleUrls: ['nhap.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NhapComponent implements AfterViewInit {
  listStreamData = new Subject();
  listStreamDataSubj = new BehaviorSubject(0);
  title = 'af-notification';
  message = '';
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
  sendMessage() { 

  }
}
