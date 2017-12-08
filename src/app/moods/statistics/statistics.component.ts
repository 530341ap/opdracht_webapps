import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { MoodDataService } from '../../mood-data.service';
import { AuthGuardService } from '../../auth-guard.service';
import { Mood } from '../mood.model';
import { MoodCategory } from '../moodCategory.model';
import { timeout } from 'rxjs/operators/timeout';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [MoodDataService, AuthenticationService, AuthGuardService]
})
export class StatisticsComponent implements OnInit {
  private _username: string;
  // Doughnut
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  public doughnutColors: Array<any> =[{backgroundColor: ["#ffc107","#4caf50","#9c27b0","#2196f3","#f44336"]}]
  private _moods: Mood[]
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartColors: any[] = [{backgroundColor: "#ffc107"},{backgroundColor:"#4caf50"},{backgroundColor: "#9c27b0"},{backgroundColor:"#2196f3"},{backgroundColor:"#f44336"}];
  public barChartData:any[] = [{ data: [], label:"Amazing"}]
  
  
  constructor(private authenticationService: AuthenticationService,private _moodService: MoodDataService) { }

  ngOnInit() {
    
    this.authenticationService.user$.subscribe(val => {
      this._username = val;
    })
    this._moodService.moodsByUsername(this._username).subscribe(moods =>{
      var data = []
      var categories : string[] = []
      this._moods = moods
      this._moodService.moods().subscribe(cs => {
        this.doughnutChartLabels = cs.map(c => c.name.valueOf())
        cs.forEach(c => {
          var amount = this._moods.filter(m => m.category.name == c.name).length
          this.doughnutChartData.push(amount)
          var dataForCategory = []
          this._moodService.activitiesByUsername(this._username).subscribe(activities => {
            this.barChartLabels = activities.map(a => a.name.valueOf())
            activities.forEach(a => {
              var moodsWithActivity = this._moods.filter(m => m.activities.findIndex(item => item.name == a.name)>-1)
              dataForCategory.push(moodsWithActivity.filter(item => item.category.name == c.name).length)
            })
            data.push({data: dataForCategory, label: c.name})
          })
        })
        setTimeout(() => {this.barChartData = data},100)
      }) 
      
    })
    
    
  }
}
