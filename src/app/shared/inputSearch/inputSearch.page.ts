
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges, AfterViewInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
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
    @Output() eventClick: EventEmitter<string> = new EventEmitter()
    constructor() {

    }
    ngAfterViewInit(): void {
        // this.inputSearchDom?.nativeElement.placeholder = this.inputName
    }
    enterEvent(e: KeyboardEvent & Event): void {
        if (e.code.toString().toLowerCase().includes('enter')) {
            const el = (e.target as HTMLInputElement)
            this.eventClick.emit(el.value)
            el.value = ''
        }
    }
}
