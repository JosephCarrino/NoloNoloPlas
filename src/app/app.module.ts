import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppUiModule } from './app-ui.module';

import { DatePipe } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarComponent } from './bar/bar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NotLoggedGuardService } from './not-logged-guard.service';
import { HistoryComponent } from './history/history.component';
import { RentalModifyComponent } from './rental-modify/rental-modify.component';
import { StartedRentalGuardService } from './started-rental-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HistoryComponent,
    RentalModifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppUiModule
  ],
  providers: [NotLoggedGuardService, StartedRentalGuardService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
