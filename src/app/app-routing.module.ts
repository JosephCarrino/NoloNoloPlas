import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: 'articles', component: ArticlesComponent, canActivate: [NotLoggedGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [NotLoggedGuardService] },
  { path: 'history', component: HistoryComponent, canActivate: [NotLoggedGuardService] },
  { path: 'modify/:id', component: RentalModifyComponent, canActivate: [StartedRentalGuardService] },
  { path: 'rental/:id', component: RentComponent, canActivate: [AvailableArticleGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
