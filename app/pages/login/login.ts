import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { FolderViewPage } from '../folder-view/folder-view';
import { AuthService, ALFRESCO_IONIC_DIRECTIVES } from 'ionic-alfresco';

declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  directives: [ALFRESCO_IONIC_DIRECTIVES],
  templateUrl: './login.html',
})
export class LoginPage implements OnInit {

  username: string = 'admin'
  password: string = 'admin';

  constructor(private navController: NavController,
              private alertCtrl: AlertController,
              private auth: AuthService) {
  }

  onLoggedIn(event: any) {
    this.navController.setRoot(FolderViewPage);
  }

  onLoginError(event: any) {
    let alert = this.alertCtrl.create({
      title: 'Login',
      subTitle: 'Login failed. Please check your credentials and try again.',
      buttons: ['OK']
    });
    alert.present();
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.navController.setRoot(FolderViewPage);
    }
  }

}
