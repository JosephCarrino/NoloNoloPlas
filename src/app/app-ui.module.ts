import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatGridListModule,
  MatCardModule,
  MatDividerModule,
  MatDatepickerModule,
  MatNativeDateModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    uiModules
  ],
  exports: uiModules
})
export class AppUiModule { }
