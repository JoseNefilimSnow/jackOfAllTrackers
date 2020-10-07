import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormBannerPage } from './form-banner.page';

describe('FormBannerPage', () => {
  let component: FormBannerPage;
  let fixture: ComponentFixture<FormBannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBannerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormBannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
