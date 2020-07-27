import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MandatoryLocationPage } from './mandatory-location.page';

describe('MandatoryLocationPage', () => {
  let component: MandatoryLocationPage;
  let fixture: ComponentFixture<MandatoryLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandatoryLocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MandatoryLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
