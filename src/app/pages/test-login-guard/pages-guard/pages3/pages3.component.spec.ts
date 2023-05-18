import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pages3Component } from './pages3.page';

describe('Pages3Component', () => {
  let component: Pages3Component;
  let fixture: ComponentFixture<Pages3Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), Pages3Component]
}).compileComponents();

    fixture = TestBed.createComponent(Pages3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
