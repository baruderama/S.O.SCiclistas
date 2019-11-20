import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Emergency } from '../emergency.model';
import { EmergenciesService } from '../emergencies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-emergencies',
  templateUrl: './my-emergencies.page.html',
  styleUrls: ['./my-emergencies.page.scss'],
})
export class MyEmergenciesPage implements OnInit, OnDestroy {
  isLoading = false;
  listEmergencies: Emergency[];
  private emergenciesSub: Subscription;

  constructor(private emergenciesService: EmergenciesService,
              private router: Router) {}

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

  newEmergency() {
    this.router.navigateByUrl('/emergencies/tabs/my-emergencies/new-emergency');
  }

  editEmergency(emergencyId: string) {
    this.router.navigate(['/', 'emergencies', 'tabs', 'my-emergencies', 'edit-emergency', emergencyId]);
  }

  otherEmergency() {
    this.router.navigateByUrl('/emergencies/tabs/my-emergencies/other-emergencies');
  }

}
