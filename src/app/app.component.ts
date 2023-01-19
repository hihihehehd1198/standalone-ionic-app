import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './shared/menu/menu.page';
import { ToolbarComponent } from './shared/toolbar/toolbar.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, MenuComponent, ToolbarComponent]
})
export class AppComponent {
  constructor(
    public environmentInjector: EnvironmentInjector
  ) { }
}
