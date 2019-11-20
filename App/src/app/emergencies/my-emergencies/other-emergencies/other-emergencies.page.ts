import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Emergency } from '../../emergency.model';
import { EmergenciesService } from '../../emergencies.service';
import { Router } from '@angular/router';
import { EmergencyLocation } from '../../location.model';

@Component({
  selector: 'app-other-emergencies',
  templateUrl: './other-emergencies.page.html',
  styleUrls: ['./other-emergencies.page.scss'],
})
export class OtherEmergenciesPage implements OnInit {

  emergency: Emergency;
  cont = 3;
  id: string;
  titulo: string;
  descripcion: string;
  lesionados = 'si';
  puntoIncidente = 'no';
  numLesionados: number;
  atrapados = 'no';
  inconsientes = 'no';
  form: FormGroup;

  constructor(private emergenciesService: EmergenciesService, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      descripcion: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.maxLength(180)]
      }),
      location: new FormControl(null, {validators: [Validators.required]})
    });
  }

  checkPuntoIncidente(e): void {
    if (!e.currentTarget.checked) {
      this.puntoIncidente = 'si';
    } else {
      this.puntoIncidente = 'no';
    }
  }

  onCreateEmergency() {
    if (!this.form.valid) {
      return;
    }
    this.emergenciesService
      .addEmergency(
        this.form.value.title,
        this.lesionados,
        this.puntoIncidente,
        this.form.value.numLesionados,
        this.atrapados,
        this.inconsientes,
        this.form.value.descripcion,
        this.form.value.location
      )
      .subscribe(() => {
        this.form.reset();
        this.router.navigate(['emergencies/tabs/my-emergencies']);
      });
  }
  onLocationPicked(location: EmergencyLocation) {
    this.form.patchValue({location: location});

  }

}
