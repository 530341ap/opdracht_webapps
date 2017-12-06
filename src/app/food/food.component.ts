import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
   
})
export class FoodComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
