import { Component } from '@angular/core';
import {
  Platform,
  ActionSheetController,
  AlertController,
  NavController,
  NavParams
} from 'ionic-angular';
import { ALFRESCO_IONIC_DIRECTIVES, NodeEvent } from 'ionic-alfresco';

import { FileView } from '../file-view/file-view';
import { NodePagingList, MinimalNodeEntryEntity } from 'alfresco-js-api';

declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  templateUrl: './folder-view.html',
  directives: [ALFRESCO_IONIC_DIRECTIVES]
})
export class FolderViewPage {

  folderId: string;

  constructor(private platform: Platform,
              private actionSheetController : ActionSheetController,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private navParams: NavParams) {
      this.folderId = navParams.get('folderId');
  }

  ngOnInit() {
  }

  nodeTapped(event: NodeEvent) {
    if (event && event.value) {
      let node = event.value;
      if (node.isFolder) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(FolderViewPage, {
          folderId: node.id
        });
        return;
      }
      if (node.isFile) {
        this.navCtrl.push(FileView, {
          nodeId: node.id
        });
        return;
      }
    }
  }

  onError(event: any) {
    let alert = this.alertCtrl.create({
      title: 'Folder',
      subTitle: 'Error displaying folder. Please try again later.',
      buttons: ['OK']
    });
    alert.present();
  }

  openCreateContentMenu() {
    let actionSheet = this.actionSheetController.create({
      title: 'New content',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Create folder',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Create folder clicked');
          }
        },
        {
          text: 'Upload file',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Upload file clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present()
  }

}
