import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmergenciesService } from '../emergencies.service';
import { Emergency } from '../emergency.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-find',
  templateUrl: './find.page.html',
  styleUrls: ['./find.page.scss'],
})
export class FindPage implements OnInit, OnDestroy {
  isLoading = false;
  listEmergencies: Emergency[];
  private emergenciesSub: Subscription;

  constructor(private emergenciesService: EmergenciesService) { }

  ngOnInit() {
    this.emergenciesSub = this.emergenciesService.emergencies.subscribe(emergencies => {
      this.listEmergencies = emergencies;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.emergenciesService.fetchEmergencies().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.emergenciesSub) {
      this.emergenciesSub.unsubscribe();
    }
  }

}
