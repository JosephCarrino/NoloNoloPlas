import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentDeleteComponent } from './dialog-content-delete.component';

describe('DialogContentDeleteComponent', () => {
  let component: DialogContentDeleteComponent;
  let fixture: ComponentFixture<DialogContentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
