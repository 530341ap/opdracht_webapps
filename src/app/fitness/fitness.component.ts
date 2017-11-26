import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.css'],
  providers: [AuthenticationService, AuthGuardService]
})
export class FitnessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
