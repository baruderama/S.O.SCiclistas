import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Emergency } from '../../emergency.model';
import { EmergenciesService } from '../../emergencies.service';
import { Router } from '@angular/router';
import { EmergencyLocation } from '../../location.model';

@Component({
  selector: 'app-new-emergency',
  templateUrl: './new-emergency.page.html',
  styleUrls: ['./new-emergency.page.scss'],
})
export class NewEmergencyPage implements OnInit {
  emergency: Emergency;
  cont = 3;
  id: string;
  titulo: string;
  descripcion: string;
  lesionados = 'no';
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
      numLesionados: new FormControl(null, {
        updateOn: 'blur',
        validators: []
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

  checkAtrapados(e): void {
    if (!e.currentTarget.checked) {
      this.atrapados = 'si';
    } else {
      this.atrapados = 'no';
    }
  }

  checkInconsientes(e): void {
    if (!e.currentTarget.checked) {
      this.inconsientes = 'si';
    } else {
      this.inconsientes = 'no';
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
