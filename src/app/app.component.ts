import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
// import Router from './app.router';
import { MenuComponent } from './shared/menu/menu.page';
import { ToolbarComponent } from './shared/toolbar/toolbar.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, MenuComponent, ToolbarComponent]
})
export class AppComponent implements OnInit {
  isPageApp = new BehaviorSubject(true)
  routeService = inject(Router)
  constructor(
    public environmentInjector: EnvironmentInjector
  ) { }
  ngOnInit(): void {
    this.checkRouteApp()
    // console.log(this.routeService.url)
    this.routeService.url === '/' && this.routeService.navigateByUrl('/Pages/dashboard')
  }

  checkRouteApp() {
    const routeLink = this.routeService.url
    this.isPageApp.next(!routeLink.toString().includes('my-cv'))
  }
}
