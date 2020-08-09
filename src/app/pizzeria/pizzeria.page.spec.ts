import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PizzeriaPage } from './pizzeria.page';

describe('PizzeriaPage', () => {
  let component: PizzeriaPage;
  let fixture: ComponentFixture<PizzeriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzeriaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PizzeriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
