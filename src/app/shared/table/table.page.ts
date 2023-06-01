import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  inject,
  EventEmitter,
  AfterViewChecked,
  ChangeDetectorRef,
  DoCheck,
  AfterContentChecked,
  ChangeDetectionStrategy,
  ViewChildren,
  NgModule,
  ɵɵsetComponentScope,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonCheckbox,
  IonicModule,
  IonModal,
  ModalController,
} from '@ionic/angular';
import { ArrayObjectPipe } from '../../pipes/array-object.pipe';
import { ButtonComponent } from '../button/button.page';
import { DialogComponent } from '../dialog-confirm/dialog.page';
import { FormDialogComponent } from '../formDialog/formDialog.pages';
import { InputSearchComponent } from '../inputSearch/inputSearch.page';
// import { cloneDeep } from 'lodash';
import * as Lodash from 'lodash';
import { SampleModalComponent } from '../sampleModal/sampleModal.page';
import { map, of, tap, take, distinctUntilChanged } from 'rxjs';
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
    FormsModule,
    FormDialogComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/**
 * this is  Presentation Components 
 */
export class TableComponent
  implements
  OnChanges,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  DoCheck {
  fb = inject(FormBuilder);
  modalController = inject(ModalController);
  formRender!: FormGroup;

  formcontrolName: any = {};
  masterSelected: boolean = false;
  openDialogModal = false;

  listItemCheckBox: boolean[] = [false, false, false, false, false];
  checkList: any = [];

  cdf = inject(ChangeDetectorRef);

  @ViewChild('ionCheckBoxALL') ionCheckBoxALL!: IonCheckbox;
  @ViewChildren('checkboxChild') checkboxChild!: IonCheckbox[];
  @ViewChild('formEditAdd') formEditAdd!: IonModal;
  @ViewChild('tableView', { static: false }) tableView?: ElementRef<any>;




  @Output('customOpenModal') customOpenModal: EventEmitter<any> = new EventEmitter()
  @Input() isUsingCustomForm = false

  @Output('buttonAddEvent') buttonAddEvent: EventEmitter<any> =
    new EventEmitter();

  @Output() searchingEvent: EventEmitter<any> = new EventEmitter()
  @Output('buttonEditEvent') buttonEditEvent: EventEmitter<any> =
    new EventEmitter();
  @Output('buttonDeleteEvent') buttonDeleteEvent: EventEmitter<any> =
    new EventEmitter();

  @Input() formEditAddProps?: FormGroup
  @Input() inputHolderName?: string;
  @Input() titleButtonAdd?: string = 'button';
  @Input() titleScreen?: string = 'Quản lí Sản phẩm';
  @Input() ListformControlGroup?: FormGroup;
  @Input('tableData') tableDataProps: any[] = [
    {
      col1: '12',
      col2: '22',
      col3: '32',
      col4: '42',
      col5: '52',
    },
    {
      col1: '11',
      col2: '21',
      col3: '31',
      col4: '41',
      col5: '51',
    },
    {
      col1: '13',
      col2: '23',
      col3: '33',
      col4: '43',
      col5: '53',
    },
    {
      col1: '14',
      col2: '24',
      col3: '34',
      col4: '44',
      col5: '54',
    },
    {
      col1: '15',
      col2: '25',
      col3: '35',
      col4: '45',
      col5: '55',
    },
  ];
  routeService = inject(Router);

  formCreateEdit?: FormGroup;

  tableData: any[] = this.tableDataProps;
  ngOnChanges(): void {
    this.tableData = this.tableDataProps;
    if (this.tableDataProps && this.tableDataProps.length) {
      // console.log('this.tableDataProps', this.tableDataProps);
      this.formatTableFormControl();
      this.createCheckBoxDefaultStatus();
      // console.log('formcontrolgroup', this.ListformControlGroup)
    }
    // this.cdf.markForCheck()
    // this.cdf.detach()


  }
  ngDoCheck(): void {

    // this.cdf.detectChanges();
    // this.cdf.markForCheck()
  }

  createCheckBoxDefaultStatus() {
    this.checkList = Lodash.cloneDeep(this.tableDataProps).map((x) => {
      var key = Object.keys(x)[0];
      var values = Object.values(x)[0];
      var newItem = Object.create({}) as any;
      (newItem as any)[`${key}`] = values || '';
      newItem['isSelected'] = false;
      return newItem;
    });
  }
  generateFormGroup(data?: any): FormGroup {

    let newObjetForm: any = {};

    Object.keys(this.formcontrolName).forEach((item) => {
      (newObjetForm as any)[`${item}`] = [
        data ? (data as any)[`${item}`] : '',
        Validators.required,
      ];
    });
    // console.log(newObjetForm);
    const form = this.fb.group(newObjetForm);
    // console.log(form);
    // lodash.cloneDeep(newObjetForm)
    return form;
  }

  ngOnInit(): void {
    // this.tableData = this.tableDataProps
    // this.generateFormGroup()
    // this.repoduceOfRxjs()
  }

  // repoduceOfRxjs() {
  //     of(2, 3, 4).pipe(

  //         tap((x: any) => console.log(x as any)),

  //         map((y: any) => y * 2),

  //         map((t: any) => t - 3),
  //         tap((z: any) => console.log(z as any)),

  //     ).subscribe()
  // }

  ngAfterViewChecked(): void { }

  formatTableFormControl(): void {
    if (this.tableDataProps.length) {
      Object.keys(this.tableDataProps[0]).forEach((item: any) => {
        (this.formcontrolName as any)[`${item}`] = item;
      });
      // console.log('object keys ', this.formcontrolName);
    }
  }
  ngAfterViewInit() {
    // console.log('element ', this.tableView?.nativeElement)
    if (this.tableView) {
      // const collection = this.tableView.nativeElement.querySelectorAll("tr td:first-child");
      // console.log(collection);
      // collection.style.maxWidth = '30px'
      // collection.style.width = '30px'
    }
  }



  async createEditAddForm(data?: any) {
    // console.log('data', data)
    // console.log("customOpenModal", this.customOpenModal)
    // console.log(this.formcontrolName);

    this.formRender = this.formEditAddProps ? this.formEditAddProps : this.generateFormGroup(data);

    //check custom form modal 
    console.log('form modale : ', this.customOpenModal)
    if (this.isUsingCustomForm) {
      this.customOpenModal.emit(data)
      return;
    }

    const formTemplate = await this.modalController.create({
      component: SampleModalComponent,
      componentProps: {
        formDialogParam: this.formRender,
        formSubmit: () => {
          data ? this.submitFormEdit('update', formTemplate) : this.submitFormEdit(undefined, formTemplate)
        },
        dialogTitle: 'testing',
        dialogName: 'testing',
        // listTitleInput: formControlNameObj,
        listFormControlName: this.formcontrolName,
        listControlName: this.formcontrolName,
      },
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: '',
    });
    return await formTemplate.present();
  }
  submitFormEdit(data?: string, dialog?: HTMLIonModalElement): void {
    // console.log('data update: ', data)
    // console.log(this.formRender.getRawValue())
    dialog?.dismiss()
    data?.length
      ? this.buttonEditEvent.emit(this.formRender.getRawValue())
      : this.buttonAddEvent.emit(this.formRender.getRawValue());

  }

  //open modal delete
  async openModalDelete(data?: any) {
    const isDeleteAll = data ? data : [...this.checkList].filter(
      (x) => x.isSelected === true
    );
    // console.log('rowData ,........', data)
    const isDeleteId = data ? [data.id] : [...isDeleteAll].map(x => +x['id'])





    const formDelete = await this.modalController.create({
      component: DialogComponent,
      componentProps: {
        dialogName: 'test',
        // dataParam: isDeleteAll, // form
        dialogTitle: 'test',
        submitClick: () => {
          this.deleteData(isDeleteId, formDelete);
        },
      },
    });

    return await formDelete.present();
  }
  deleteData(e?: any, dialog?: HTMLIonModalElement) {
    // console.log(e)
    dialog?.dismiss()
    this.buttonDeleteEvent.emit(e);
  }

  checkUncheckAll(e?: any) {
    for (var i = 0; i < this.checkList.length; i++) {
      this.checkList[i].isSelected = this.masterSelected;
    }
  }
  isAllSelected() {
    this.masterSelected = this.checkList.every((item: any) => {
      return item.isSelected == true;
    });
  }
  ngOnDestroy(): void {
    // console.log('destroyed !');
  }
  eventSearchTable(event: string) {
    this.searchingEvent?.emit(event)
  }
}
