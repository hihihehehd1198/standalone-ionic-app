import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-notFound',
  templateUrl: 'notFound.page.html',
  styleUrls: ['notFound.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class NotFoundComponent {
  constructor() {}
}
