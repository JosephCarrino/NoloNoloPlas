import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentSuggestComponent } from './dialog-content-suggest.component';

describe('DialogContentSuggestComponent', () => {
  let component: DialogContentSuggestComponent;
  let fixture: ComponentFixture<DialogContentSuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentSuggestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
