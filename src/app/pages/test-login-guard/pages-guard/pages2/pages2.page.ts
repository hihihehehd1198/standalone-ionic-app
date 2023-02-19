import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pages2',
  templateUrl: './pages2.page.html',
  styleUrls: ['./pages2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Pages2Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
