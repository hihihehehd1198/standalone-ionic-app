import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-inputSearch',
    templateUrl: 'inputSearch.page.html',
    styleUrls: ['inputSearch.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule]
})
export class InputSearchComponent{

}
