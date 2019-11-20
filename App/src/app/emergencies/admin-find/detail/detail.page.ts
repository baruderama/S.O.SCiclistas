import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController,  } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmergenciesService } from '../../emergencies.service';
import { Emergency } from '../../emergency.model';
import { Subscription } from 'rxjs';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  emergency: Emergency;
  isLoading = false;
  private emergencySub: Subscription;

  constructor(private route: ActivatedRoute,
              private emergenciesService: EmergenciesService,
              private navCtrl: NavController,
              private router: Router,
              public alertController: AlertController,
              public email: EmailComposer) { }

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

  async deleteEmergency() {
    this.send();
    const alert = await this.alertController.create({
      header: 'Gestionar Emergencia',
      message: '¿Esta seguro que desea gestionar esta emergencia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Gestionar',
          role: 'eliminar',
          handler: () => {
            this.route.paramMap.subscribe(paramMap => {
              if (!paramMap.has('emergencyId')) {
                this.navCtrl.navigateBack('/emergencies/tabs/admin-find');
                return;
              }
              this.emergenciesService.deleteEmergency(paramMap.get('emergencyId'))
              .subscribe(() => {
                this.router.navigate(['emergencies/tabs/admin-find']);
              });
            });
          }
        }]
    });

    await alert.present();
  }

  send() {
    let email = {
      to: 'johntonjohn7@gmail.com',
      cc: [],
      bcc: [],
      attachment: [],
      subject: this.emergency.titulo,
      body: 'Hay lesionados? '+this.emergency.lesionados
      +' Esta en el punto del incidente? '+this.emergency.puntoIncidente
      +' Numero de lesionados: '+this.emergency.numLesionados
      +' Hay personas atrapadas? '+this.emergency.atrapados
      +' Hay personas inconcietes? '+this.emergency.inconsientes
      +' Descripcion: '+this.emergency.descripcion
      +' Imagen: '+this.emergency.imageUrl
      +' Ubicacion: '+this.emergency.location
      +' UserId: '+this.emergency.userId,
      isHtml: false,
      app: 'Gmail'
    };
    this.email.open(email);
  }
}
