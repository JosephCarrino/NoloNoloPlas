import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentMysuggestComponent } from './dialog-content-mysuggest.component';

describe('DialogContentMysuggestComponent', () => {
  let component: DialogContentMysuggestComponent;
  let fixture: ComponentFixture<DialogContentMysuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentMysuggestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentMysuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
