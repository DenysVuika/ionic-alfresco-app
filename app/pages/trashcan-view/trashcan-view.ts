import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ALFRESCO_IONIC_DIRECTIVES, NodeEvent } from 'ionic-alfresco';
import { DeletedNodesPaging } from 'alfresco-js-api';

// import { FileView } from '../file-view/file-view';

declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  templateUrl: './trashcan-view.html',
  directives: [ALFRESCO_IONIC_DIRECTIVES]
})
export class TrashcanViewPage {

  constructor(private navCtrl: NavController,
              private alertCtrl: AlertController) {
  }

  nodeTapped(event: NodeEvent) {
    if (event && event.value) {
      let node = event.value;
      if (node.isFile) {
        // TODO: file view does not yet support deleted content
        /*
        this.navCtrl.push(FileView, {
          nodeId: node.id,
          isDeleted: true
        });
        */
      }
    }
  }

  onError(event: any) {
    let alert = this.alertCtrl.create({
      title: 'Folder',
      subTitle: 'Error occurred. Please try again later.',
      buttons: ['OK']
    });
    alert.present();
  }

}
