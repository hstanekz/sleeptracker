import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

	constructor() {
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
		SleepService.LoadDefaultData = false;
	}
	this.loadSleepData(); // Load local storage data
	}

	private addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
		this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		console.log('Logged new overnight data:', sleepData);
    	console.log('All Overnight Data:', SleepService.AllOvernightData);
		this.saveSleepData();

	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
    	console.log('All Sleepiness Data:', SleepService.AllSleepinessData);
		this.saveSleepData();
	}

	// Save local storage data using capacitor preference
	async saveSleepData() {
		await Preferences.set({
			key:'overnightData',
			value: JSON.stringify(SleepService.AllOvernightData),
		});
		await Preferences.set({
			key:'sleepinessData',
			value: JSON.stringify(SleepService.AllSleepinessData),
		})
	}

	// Load local storage data using capacitor preference
	async loadSleepData() {
		const overnightData = await Preferences.get({key: 'overnightData'})
		const sleepinessData = await Preferences.get({key: 'sleepinessData'})

		SleepService.AllOvernightData = overnightData.value ? JSON.parse(overnightData.value) : [];
    	SleepService.AllSleepinessData = sleepinessData.value ? JSON.parse(sleepinessData.value) : [];

	}
}
