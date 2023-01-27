import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges, OnInit, AfterViewInit, ViewChild, ElementRef, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EventEmitter } from 'stream';
import { ArrayObjectPipe } from '../../pipes/array-object.pipe';
import { ButtonComponent } from '../button/button.page';
import { InputSearchComponent } from '../inputSearch/inputSearch.page';

@Component({
    selector: 'app-table',
    templateUrl: 'table.page.html',
    styleUrls: ['table.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, InputSearchComponent, ArrayObjectPipe, ButtonComponent]
})
export class TableComponent implements OnChanges, OnInit, AfterViewInit {


    @Output('buttonAddEvent') buttonAddEvent?: EventEmitter
    @Output('buttonEditEvent') buttonEditEvent?: EventEmitter
    @Output('buttonDeleteEvent') buttonDeleteEvent?: EventEmitter
    // @Output('deleteAllEvent') deleteAllEvent?: EventEmitter


    @ViewChild('tableView', { static: false }) tableView?: ElementRef<any>;
    @Input('tableData') tableDataProps = [
        {
            col1: '1',
            col2: '2',
            col3: '3',
            col4: '4',
            col5: '5',

        }
        , {
            col1: '1',
            col2: '2',
            col3: '3',
            col4: '4',
            col5: '5',

        }
    ]
    constructor() {
        // this.tableData = this.tableDataProps
    }
    tableData: any[] = this.tableDataProps
    ngOnChanges(): void {
        this.tableData = this.tableDataProps
    }
    ngOnInit(): void {
        // this.tableData = this.tableDataProps
    }
    ngAfterViewInit(): void {
        console.log('element ', this.tableView?.nativeElement)
        if (this.tableView) {
            const collection = this.tableView.nativeElement.querySelectorAll("tr td:first-child");
            console.log(collection);
            collection.style.maxWidth = '30px'
            collection.style.width = '30px'

        }
    }
}
