import { Component, ViewChild, OnInit } from '@angular/core';
import { ionicBootstrap, Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { ALFRESCO_IONIC_PROVIDERS, AuthService, SettingsService } from 'ionic-alfresco';

import { FolderViewPage } from './pages/folder-view/folder-view';
import { LoginPage } from './pages/login/login';

declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  templateUrl: './app.html',
  providers: [ALFRESCO_IONIC_PROVIDERS]
})
class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private authService: AuthService,
    private settingsService: SettingsService
  ) {

    // Uncomment this line and provide ECM host value
    // otherwise http://127.0.0.1:8080 will be used
    // settingsService.setEcmHost('<YOUR ALFRESCO SERVER ADDRESS>');
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Files', component: FolderViewPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  ngOnInit() {
    this.rootPage = this.authService.isLoggedIn() ? FolderViewPage : LoginPage;
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  logout() {
    this.authService.logout()
      .then(
        () => this.nav.setRoot(LoginPage),
        (err) => this.nav.setRoot(LoginPage)
      );
  }
}

ionicBootstrap(MyApp);
