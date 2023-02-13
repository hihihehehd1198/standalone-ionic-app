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
  @Input() customClass: string = 'border-[gray] border-[1px] rounded-[10px] pl-[10px] h-[40px] w-[100%]'

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectControlName) {
      setTimeout(() => {
        this.listItem = of(['1', '2', '3']);
      }, 0);
    }
  }
}
