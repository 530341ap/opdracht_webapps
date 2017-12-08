import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { Router } from '@angular/router';
import { MoodCategory } from './moods/moodCategory.model';
import { MoodDataService } from './mood-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MoodDataService]
})
export class AppComponent {
  title = 'app';
  public loggedin: boolean;

  constructor(private authenticationService: AuthenticationService, private router: Router, private moodService: MoodDataService) { }

  ngOnInit() {
    var username = ""
    this.authenticationService.user$.subscribe(val => {
      this.loggedin = (val != null);
      username = val
    })
    /*var categories = [new MoodCategory("amber lighten-2","Amazing"),new MoodCategory("green lighten-2","Good"),
    new MoodCategory("purple lighten-2","Meh"), new MoodCategory("blue lighten-2","Not good"), 
    new MoodCategory("red lighten-2","Horrible")]
    this.moodService.addCategories(categories).subscribe();*/
  }
}
