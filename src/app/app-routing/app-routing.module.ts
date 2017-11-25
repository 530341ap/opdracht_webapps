import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MoodsComponent } from '../moods/moods.component';
import { FoodComponent } from '../food/food.component';
import { FitnessComponent } from '../fitness/fitness.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../user/login/login.component';
import { RegisterComponent } from '../user/register/register.component';
import { AuthGuardService } from '../auth-guard.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'moods', canActivate: [ AuthGuardService ], component: MoodsComponent},
  { path: 'food', canActivate: [ AuthGuardService ], component: FoodComponent },
  { path: 'fitness', canActivate: [ AuthGuardService ], component: FitnessComponent},
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
    )
  ],
  declarations: [
    HomeComponent,
    MoodsComponent,
    FoodComponent,
    FitnessComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
