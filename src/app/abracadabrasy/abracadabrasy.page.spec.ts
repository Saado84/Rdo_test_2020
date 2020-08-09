import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AbracadabrasyPage } from './abracadabrasy.page';

describe('AbracadabrasyPage', () => {
  let component: AbracadabrasyPage;
  let fixture: ComponentFixture<AbracadabrasyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbracadabrasyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AbracadabrasyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
