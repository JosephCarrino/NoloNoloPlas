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
import { ArticlesComponent } from './articles/articles.component';
import { RentComponent } from './rent/rent.component';
import { AvailableArticleGuardService } from './available-article-guard.service';
import { ArticleCardComponent } from './article-card/article-card.component';
import { DialogContentDeleteComponent } from './dialog-content-delete/dialog-content-delete.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PricecheckComponent } from './pricecheck/pricecheck.component';
import { DialogContentReplaceComponent } from './dialog-content-replace/dialog-content-replace.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HistoryComponent,
    RentalModifyComponent,
    ArticlesComponent,
    RentComponent,
    ArticleCardComponent,
    DialogContentDeleteComponent,
    HomepageComponent,
    PricecheckComponent,
    DialogContentReplaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppUiModule
  ],
  providers: [AvailableArticleGuardService, NotLoggedGuardService, StartedRentalGuardService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
