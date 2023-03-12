import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { head } from 'lodash';

@Component({
  selector: 'app-dynamic-content-one',
  templateUrl: 'dynamic-content-one.page.html',
  styleUrls: ['dynamic-content-one.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicContentOneComponent {
  constructor() {}
}
