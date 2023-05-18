import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pages2Component } from './pages2.page';

describe('Pages2Component', () => {
  let component: Pages2Component;
  let fixture: ComponentFixture<Pages2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), Pages2Component]
}).compileComponents();

    fixture = TestBed.createComponent(Pages2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
