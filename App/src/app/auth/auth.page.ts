import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() { }

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Iniciando Sesion...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(
          resData => {
            if (email === 'johntonjohn7@gmail.com') {
              this.isLoading = false;
              loadingEl.dismiss();
              this.router.navigateByUrl('/emergencies/tabs/admin-find');
            } else {
              console.log(resData);
              this.isLoading = false;
              loadingEl.dismiss();
              this.router.navigateByUrl('/emergencies/tabs/find');
            }
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'No se puede iniciar sesion. Por favor intenta de nuevo.';
            if (code === 'EMAIL_EXISTS') {
              message = 'Esta direccion de correo electronico ya existe';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'La direccion de correo electronico no pudo ser encontrada.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'La contraseña es incorrecta.';
            }
            this.showAlert(message);
          }
        );
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}
