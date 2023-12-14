import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { format, parseISO } from 'date-fns';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	isSleepModalOpen = false;
  	isSleepinessModalOpen = false;

	selectedStartDate: string = '';
	selectedEndDate: string = '';
	
	selectedSleepinessLevel: number | null = null;


	setOpenSleepModal(isOpen: boolean) {
    	this.isSleepModalOpen = isOpen;
  }
  	
  	setOpenSleepinessModal(isOpen: boolean) {
    	this.isSleepinessModalOpen = isOpen;
  }

  constructor(public sleepService:SleepService, public toastController: ToastController) {
	}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	updateFormattedDate() {
		if (this.selectedStartDate) {
			this.selectedStartDate = format(parseISO(this.selectedStartDate), 'EEEEEE, MMM d, yyyy, hh:mm a');
			// console.log(this.selectedStartDate)
		}
	}
	  
	updateFormattedEndDate() {
		if (this.selectedEndDate) {
			this.selectedEndDate = format(parseISO(this.selectedEndDate), 'EEEEEE, MMM d, yyyy, hh:mm a');
		}
	}

	async logSleepData() {
		if (this.selectedStartDate && this.selectedEndDate) {
			const start = new Date(this.selectedStartDate);
			const end = new Date(this.selectedEndDate);

			// Create instance of OvernightSleepData
			const newSleepData = new OvernightSleepData(start, end);

			// Log using sleep service
			this.sleepService.logOvernightData(newSleepData);
			// console.log('Sleep data added:', newSleepData);

			// Show confirmation message
			const toast = await this.toastController.create({
				message: 'Sleep data logged successfully.',
				duration: 2000
			  });
			  toast.present();
		
			  // Close the modal
			  this.setOpenSleepModal(false);
			
		}
	}

	async logSleepinessData() {
		if (this.selectedSleepinessLevel != null) {
			const sleepinessData = new StanfordSleepinessData(this.selectedSleepinessLevel);
			this.sleepService.logSleepinessData(sleepinessData);

			// Reset the selected level and close the modal
    		this.selectedSleepinessLevel = null;
    		this.setOpenSleepinessModal(false);

			// Show confirmation message
			const toast = await this.toastController.create({
				message: 'Sleepiness data logged successfully.',
				duration: 2000
			  });
			  toast.present();
		
			  // Close the modal
			  this.setOpenSleepinessModal(false);
		}
	}
}