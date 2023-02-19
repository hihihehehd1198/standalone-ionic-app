import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pages1',
  templateUrl: './pages1.page.html',
  styleUrls: ['./pages1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Pages1Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
