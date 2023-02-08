import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges, OnInit, AfterViewInit, ViewChild, ElementRef, Output, inject, EventEmitter, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, IonModal } from '@ionic/angular';
import { ArrayObjectPipe } from '../../pipes/array-object.pipe';
import { ButtonComponent } from '../button/button.page';
import { DialogComponent } from '../dialog/dialog.page';
import { FormDialogComponent } from '../formDialog/formDialog.pages';
import { InputSearchComponent } from '../inputSearch/inputSearch.page';
import { cloneDeep } from 'lodash';
import * as Lodash from 'lodash';
@Component({
    selector: 'app-table',
    templateUrl: 'table.page.html',
    styleUrls: ['table.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        InputSearchComponent,
        ArrayObjectPipe,
        ButtonComponent,
        DialogComponent,
        FormDialogComponent,
    ],
})
export class TableComponent implements OnChanges, OnInit, AfterViewInit, AfterViewChecked {
    fb = inject(FormBuilder)
    formRender!: FormGroup
    formcontrolName: any = {}
    openDialogModal = false
    @Output('buttonAddEvent') buttonAddEvent?: EventEmitter<any>
    @Output('buttonEditEvent') buttonEditEvent?: EventEmitter<any>
    @Output('buttonDeleteEvent') buttonDeleteEvent?: EventEmitter<any>
    // @Output('deleteAllEvent') deleteAllEvent?: EventEmitter
    cdf = inject(ChangeDetectorRef)


    @ViewChild('tableView', { static: false }) tableView?: ElementRef<any>;
    // @ViewChild('isEnabledButton') isEnabledButton?: ElementRef<any>;
    @Input() titleButtonAdd?: string = 'button'
    @Input() titleScreen?: string = 'Quản lí Sản phẩm'
    @ViewChild('formEditAdd') formEditAdd!: IonModal
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

        }, {
            col1: '1',
            col2: '2',
            col3: '3',
            col4: '4',
            col5: '5',

        }, {
            col1: '1',
            col2: '2',
            col3: '3',
            col4: '4',
            col5: '5',

        }, {
            col1: '1',
            col2: '2',
            col3: '3',
            col4: '4',
            col5: '5',

        }
    ]
    routeService = inject(Router)
    formCreateEdit?: FormGroup
    constructor() {
        // this.tableData = this.tableDataProps
    }
    tableData: any[] = this.tableDataProps
    ngOnChanges(): void {
        this.tableData = this.tableDataProps

    }
    generateFormGroup(): FormGroup {
        const listKey = this.tableDataProps[0]
        // console.log('key , ', listKey)
        // const newObj = Object.keys(listKey).reduce((current: any, item: any): any => {
        //     debugger;
        //     const newItemObject: any = {}
        //     newItemObject[item] = (listKey as any)[`${item}`]
        //     console.log(newItemObject)
        //     Object.assign({ ...(current as any) }, newItemObject)
        // }, {})
        let newObjetForm: any = {}
        Object.keys(listKey).forEach((item) => {
            (newObjetForm as any)[`${item}`] = ['testing', Validators.required]
        })
        console.log(newObjetForm)
        const form = this.fb.group(newObjetForm)
        console.log(form)
        // lodash.cloneDeep(newObjetForm)
        return form
    }

    ngOnInit(): void {
        // this.tableData = this.tableDataProps
        // this.generateFormGroup()
    }
    ngAfterViewChecked(): void {

    }

    formatTableFormControl(): void {
        Object.keys(this.tableDataProps[0]).forEach(
            (item: any) => { (this.formcontrolName as any)[`${item}`] = item }
        )
        console.log('object keys ', this.formcontrolName)
    }
    ngAfterViewInit() {
        console.log('element ', this.tableView?.nativeElement)
        if (this.tableView) {
            const collection = this.tableView.nativeElement.querySelectorAll("tr td:first-child");
            console.log(collection);
            // collection.style.maxWidth = '30px'
            // collection.style.width = '30px'

        }
        this.formRender = this.generateFormGroup()
        this.formatTableFormControl()
        // this.openModal()
    }
    openModal(data?: any) {
        console.log('_____________modal_______________________')
        this.openDialogModal = true

    }

}
