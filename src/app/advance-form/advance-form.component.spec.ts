import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceFormComponent } from './advance-form.component';

describe('AdvanceFormComponent', () => {
  let component: AdvanceFormComponent;
  let fixture: ComponentFixture<AdvanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
