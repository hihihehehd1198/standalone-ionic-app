import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-notFound',
  templateUrl: 'notFound.page.html',
  styleUrls: ['notFound.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class NotFoundComponent {
  name = 'Angular';

  masterSelected: boolean = false
  checklist = [
    { id: 1, value: 'Elenor Anderson', isSelected: false },
    { id: 2, value: 'Caden Kunze', isSelected: true },
    { id: 3, value: 'Ms. Hortense Zulauf', isSelected: true },
    { id: 4, value: 'Grady Reichert', isSelected: false },
    { id: 5, value: 'Dejon Olson', isSelected: false },
    { id: 6, value: 'Jamir Pfannerstill', isSelected: false },
    { id: 7, value: 'Aracely Renner DVM', isSelected: false },
    { id: 8, value: 'Genoveva Luettgen', isSelected: false }
  ];
  checkedList: any;

  constructor() {

  }

  checkUncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    // this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.checklist.every(function (item: any) {
      return item.isSelected == true;
    })
    // this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected)
        this.checkedList.push(this.checklist[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }
}
