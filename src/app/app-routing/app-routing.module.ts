import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MoodsComponent } from '../moods/moods.component';
import { FoodComponent } from '../food/food.component';
import { FitnessComponent } from '../fitness/fitness.component';
import { ProfileComponent } from '../profile/profile.component';
import { HomeComponent } from '../home/home.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'moods', component: MoodsComponent},
  { path: 'food', component: FoodComponent },
  { path: 'fitness', component: FitnessComponent},
  { path: 'profile', component: ProfileComponent},
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
    ProfileComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
