import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { head } from 'lodash';

@Component({
  selector: 'app-dynamic-content-two',
  templateUrl: 'dynamic-content-two.page.html',
  styleUrls: ['dynamic-content-two.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicContentTwoComponent {
  constructor() {}
}
