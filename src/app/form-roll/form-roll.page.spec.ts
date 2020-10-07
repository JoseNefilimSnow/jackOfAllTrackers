import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormRollPage } from './form-roll.page';

describe('FormRollPage', () => {
  let component: FormRollPage;
  let fixture: ComponentFixture<FormRollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRollPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormRollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
