import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { EmergenciesService } from '../../emergencies.service';
import { Emergency } from '../../emergency.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-emergency-detail',
  templateUrl: './emergency-detail.page.html',
  styleUrls: ['./emergency-detail.page.scss'],
})
export class EmergencyDetailPage implements OnInit, OnDestroy {
  emergency: Emergency;
  isLoading = false;
  private emergencySub: Subscription;

  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private emergenciesService: EmergenciesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('emergencyId')) {
        this.navCtrl.navigateBack('/emergencies/tabs/my-emergencies');
        return;
      }
      this.isLoading = true;
      this.emergencySub = this.emergenciesService
      .getEmergency(paramMap.get('emergencyId'))
      .subscribe(emergency => {
        this.emergency = emergency;
        this.isLoading = false;
      });
    });
  }

  ngOnDestroy() {
    if (this.emergencySub) {
      this.emergencySub.unsubscribe();
    }
  }
}
