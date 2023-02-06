// import { EventEmitter } from 'stream';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButtons, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-button',
  templateUrl: 'button.page.html',
  styleUrls: ['button.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ButtonComponent {
  constructor() {}
  @Input() customClass = 'testing';
  @Input() buttonId = '';
  @Output() clickEvent = new EventEmitter<any>();
  loggingButton(e: any) {
    this.clickEvent?.emit(e);
    console.log('button click ');
  }
}
