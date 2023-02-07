import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { interval, Observable, of, timeout } from 'rxjs';

@Component({
  selector: 'app-selectInput',
  templateUrl: 'selectInput.page.html',
  styleUrls: ['selectInput.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SelectInputComponent implements OnChanges {
  @Input() selectControlName?: string;
  @Input() listItem?: Observable<string[]>;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectControlName) {
      setTimeout(() => {
        this.listItem = of(['1', '2', '3']);
      }, 3000);
    }
  }
}
