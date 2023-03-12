import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { head } from 'lodash';
import { DynamicContentOneComponent } from './dynamic-content-one/dynamic-content-one.page';
import { DynamicContentTwoComponent } from './dynamic-content-two/dynamic-content-two.page';
import { dynamicTemp } from './dynamicTemp.directive';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'dynamic-comp-render.page.html',
  styleUrls: ['dynamic-comp-render.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    DynamicContentOneComponent,
    ReactiveFormsModule,
  ],
//   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicCompRenderComponent implements AfterViewInit {
  @ViewChild(dynamicTemp, { static: true }) dynamicContent!: dynamicTemp;
  viewContainerRef = inject(ViewContainerRef);
  fb = inject(FormBuilder);
  formGroup!: FormGroup;
  cdf = inject(ChangeDetectorRef);
  constructor() {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  addDynamicCompOne() {
    // const componentRef = this.dynamicContent.conatinerRef;
    // const templateRef = componentRef.createComponent(DynamicContentOneComponent)
    // // templateRef.instance.data =
  }
  addDynamicCompTwo() {
    // console.log('dynamic comp action ! ');
    // const componentFactory = this.viewContainerRef.createComponent(
    //   DynamicContentTwoComponent
    // );
  }
  ngAfterViewInit(): void {
    // this.cdf.detectChanges();
  }
}
