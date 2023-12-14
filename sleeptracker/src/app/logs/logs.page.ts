import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {
  public allOvernightData!: any[]; 
  public allSleepinessData!: any[];
  selectedSegment: string = 'sleep';

  constructor() { }

  ngOnInit() {
    // View sleep data
    this.allOvernightData = SleepService.AllOvernightData;
    this.allSleepinessData = SleepService.AllSleepinessData;
  }
}
