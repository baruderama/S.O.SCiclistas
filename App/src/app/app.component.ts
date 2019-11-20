import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';

import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { StatusBar } from '@ionic-native/status-bar/ngx';

var config = {
  apiKey: 'AIzaSyAeiJp-vFypvuGSZJfMS6cmVMZkHCWU9ng',
  authDomain: 'bd-sosciclistas.firebaseapp.com',
  databaseURL: 'https://bd-sosciclistas.firebaseio.com',
  projectId: 'bd-sosciclistas',
  storageBucket: 'bd-sosciclistas.appspot.com',
  messagingSenderId: '230313968710',
  appId: '1:230313968710:web:ddb0ce8860e958d1f43647',
  measurementId: 'G-5SP32CXJQN'
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
      this.statusBar.styleDefault();
      firebase.initializeApp(config);
    });

  }

  OnLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
