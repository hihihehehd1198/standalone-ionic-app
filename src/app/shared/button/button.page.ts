// import { EventEmitter } from 'stream';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IonButtons, IonicModule, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-button',
  templateUrl: 'button.page.html',
  styleUrls: ['button.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [IonicModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements AfterViewInit, OnInit, OnDestroy {

  @Input() customClass = 'testing';
  @Input() buttonId = '';
  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>()
  @Input() dataBinding: any;
  cdf = inject(ChangeDetectorRef)
  loggingButton(e?: any) {
    // console.log(e)
    console.log(this.dataBinding)
    this.clickEvent.emit(this.dataBinding);
    console.log('button click ');
  }
  ngOnInit(): void {
    // this.cdf.detectChanges()
    // this.cdf.markForCheck()
  }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    console.log('destroyedddddddddddddd')
  }
}
