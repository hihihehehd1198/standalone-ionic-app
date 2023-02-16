import { EventEmitter } from 'stream';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges, AfterViewInit, Output, ViewChild, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
    selector: 'app-inputSearch',
    templateUrl: 'inputSearch.page.html',
    styleUrls: ['inputSearch.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InputSearchComponent implements AfterViewInit {


    @Input() inputName?: string = 'Tìm kiếm sản phẩm ...';
    @Output() eventClick?: EventEmitter;
    constructor() {

    }
    ngAfterViewInit(): void {
        // this.inputSearchDom?.nativeElement.placeholder = this.inputName
    }
    enterEvent(e: any): void {
        if (e.code.toString().toLowerCase().includes('enter')) {
            console.log('click', e.target.value)
        }
    }
}
