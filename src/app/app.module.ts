import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppUiModule } from './app-ui.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarComponent } from './bar/bar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NotLoggedGuardService } from './not-logged-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppUiModule
  ],
  providers: [NotLoggedGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
