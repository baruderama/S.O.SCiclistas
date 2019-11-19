import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Emergency } from '../../emergency.model';
import { EmergenciesService } from '../../emergencies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-emergency',
  templateUrl: './edit-emergency.page.html',
  styleUrls: ['./edit-emergency.page.scss'],
})
export class EditEmergencyPage implements OnInit, OnDestroy {
  emergency: Emergency;
  emergencyId: string;
  form: FormGroup;
  isLoading = false;
  private emergencySub: Subscription;

  constructor(private route: ActivatedRoute,
              private emergenciesService: EmergenciesService,
              private navCtrl: NavController,
              private router: Router,
              public alertController: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('emergencyId')) {
        this.navCtrl.navigateBack('/emergencies/tabs/my-emergencies');
        return;
      }
      this.emergencyId = paramMap.get('emergencyId');
      this.isLoading = true;
      this.emergencySub = this.emergenciesService
      .getEmergency(paramMap.get('emergencyId'))
      .subscribe(emergency => {
        this.emergency = emergency;
        this.form = new FormGroup({
          title: new FormControl(this.emergency.titulo, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          numLesionados: new FormControl(this.emergency.numLesionados, {
            updateOn: 'blur',
            validators: []
          }),
          description: new FormControl(this.emergency.descripcion, {
            updateOn: 'blur',
            validators: [Validators.maxLength(180)]
          })
        });
        this.isLoading = false;
      });
    });
  }

  ngOnDestroy() {
    if (this.emergencySub) {
      this.emergencySub.unsubscribe();
    }
  }

  checkLesionados(e): void {
    if (!e.currentTarget.checked) {
      this.emergency.lesionados = 'si';
    } else {
      this.emergency.lesionados = 'no';
    }
  }

  checkPuntoIncidente(e): void {
    if (!e.currentTarget.checked) {
      this.emergency.puntoIncidente = 'si';
    } else {
      this.emergency.puntoIncidente = 'no';
    }
  }

  checkAtrapados(e): void {
    if (!e.currentTarget.checked) {
      this.emergency.atrapados = 'si';
    } else {
      this.emergency.atrapados = 'no';
    }
  }

  checkInconsientes(e): void {
    if (!e.currentTarget.checked) {
      this.emergency.inconsientes = 'si';
    } else {
      this.emergency.inconsientes = 'no';
    }
  }

  editEmergency() {
    this.emergenciesService
      .editEmergency(
        this.emergency.id,
        this.form.value.title,
        this.form.value.description
      )
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(['emergencies/tabs/my-emergencies']);
      });
  }

  /*async deleteEmergency() {
    const alert = await this.alertController.create({
      header: 'Eliminar Emergencia',
      message: 'Estas seguro que deseas eliminar esta la emergencia?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          role: 'eliminar',
          handler: () => {
            this.route.paramMap.subscribe(paramMap => {
              if (!paramMap.has('emergencyId')) {
                this.navCtrl.navigateBack('/emergencies/tabs/my-emergencies');
                return;
              }
              this.emergenciesService.deleteEmergency(paramMap.get('emergencyId'))
              .subscribe(() => {
                this.form.reset();
                this.router.navigate(['emergencies/tabs/my-emergencies']);
              });
            });
          }
        }]
    });

    await alert.present();
  }*/
}
