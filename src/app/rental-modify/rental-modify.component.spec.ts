import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalModifyComponent } from './rental-modify.component';

describe('RentalModifyComponent', () => {
  let component: RentalModifyComponent;
  let fixture: ComponentFixture<RentalModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
