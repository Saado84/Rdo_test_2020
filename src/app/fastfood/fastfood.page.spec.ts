import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FastfoodPage } from './fastfood.page';

describe('FastfoodPage', () => {
  let component: FastfoodPage;
  let fixture: ComponentFixture<FastfoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastfoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FastfoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
