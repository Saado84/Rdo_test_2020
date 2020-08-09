import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuburgerPage } from './menuburger.page';

describe('MenuburgerPage', () => {
  let component: MenuburgerPage;
  let fixture: ComponentFixture<MenuburgerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuburgerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuburgerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
