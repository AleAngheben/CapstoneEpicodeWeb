import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesscheckoutComponent } from './successcheckout.component';

describe('SuccesscheckoutComponent', () => {
  let component: SuccesscheckoutComponent;
  let fixture: ComponentFixture<SuccesscheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccesscheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccesscheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
