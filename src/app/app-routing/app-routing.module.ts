import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MoodsComponent } from '../moods/moods.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../user/login/login.component';
import { RegisterComponent } from '../user/register/register.component';
import { AuthGuardService } from '../auth-guard.service';
import { AuthenticationService } from '../authentication.service';
import { LogoutComponent } from '../user/logout/logout.component';
import { AddMoodComponent } from '../moods/add-mood/add-mood.component';
import { SettingsComponent } from '../moods/settings/settings.component';
import { StatisticsComponent } from '../moods/statistics/statistics.component';
import { ChartsModule } from 'ng2-charts';
import { MaterializeDirective } from 'angular2-materialize';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'users/logout', component: LogoutComponent},
  { path: 'moods', canActivate: [ AuthGuardService ], component: MoodsComponent},
  { path: 'addMood', canActivate: [ AuthGuardService ], component: AddMoodComponent},
  { path: 'moods/editMood/:id', canActivate: [ AuthGuardService ], component: AddMoodComponent},
  { path: 'settings', canActivate: [ AuthGuardService ], component: SettingsComponent},
  { path: 'statistics', canActivate: [ AuthGuardService ], component: StatisticsComponent},
  { path: 'profile', canActivate: [ AuthGuardService ], component: ProfileComponent},
  { path: 'users/login', component: LoginComponent},
  { path: 'users/register', component: RegisterComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
]

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ChartsModule
  ],
  declarations: [
    HomeComponent,
    MoodsComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    AddMoodComponent,
    SettingsComponent,
    StatisticsComponent,
    MaterializeDirective    
  ],
  exports: [
    RouterModule
  ],
   
})
export class AppRoutingModule { }
