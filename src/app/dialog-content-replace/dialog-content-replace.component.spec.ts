import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentReplaceComponent } from './dialog-content-replace.component';

describe('DialogContentReplaceComponent', () => {
  let component: DialogContentReplaceComponent;
  let fixture: ComponentFixture<DialogContentReplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentReplaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
