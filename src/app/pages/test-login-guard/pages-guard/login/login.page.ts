import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  delay,
  distinct,
  distinctUntilChanged,
  exhaustMap,
  from,
  interval,
  last,
  of,
  Subject,
  switchMap,
  tap,
  timeout,
} from 'rxjs';
import { ArticleService } from 'src/app/servies/article.service';

// selector: 'app-pages1',
// templateUrl: './pages1.page.html',
// styleUrls: ['./pages1.page.scss'],
@Component({
  selector: 'app-root',
  templateUrl: './login.page.html',
  styles: [],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  envInject = inject(EnvironmentInjector);
  pageClick = new Subject();
  // formLogin = new FormGroup({
  //   userName: new FormControl(),
  //   passWord: new FormControl(),
  // });
  articleService = inject(ArticleService);
  fb = inject(FormBuilder);
  formLogin = this.fb.group({
    userName: ['', Validators.required],
    passWord: ['', Validators.required],
  });

  constructor() {}

  ngOnInit() {
    this.getLastItemofSub();
  }

  getLastItemofSub() {
    from([1, 2, 3, 4, 5])
      .pipe(
        last(),
        tap((x) => console.log(x))
      )
      .subscribe();
  }
  submitForm() {
    const formData = {
      username: this.formLogin.controls['userName'].value || '',
      password: this.formLogin.controls['passWord'].value || '',
    };
    // this.articleService
    //   .login(formData)
    //   .pipe(
    //     delay(10000),
    //     tap((x) => console.log(x))
    //   )
    //   .subscribe();
    of(formData)
      .pipe(
        distinctUntilChanged(),
        switchMap((data) => this.articleService.login(data).pipe())
      )
      .subscribe((res) => console.log(res));

    // from([1, 1, 1, 1, 1])
    //   .pipe(
    //     delay(10000),
    //     exhaustMap((res: any) => {
    //       return of(res);
    //     })
    //   )
    //   .pipe(distinctUntilChanged())
    //   .subscribe(console.log);

    // of(1)
    //   .pipe(tap((x) => x++))
    //   .subscribe(console.log);
    console.log(this.formLogin.getRawValue());
  }
}
