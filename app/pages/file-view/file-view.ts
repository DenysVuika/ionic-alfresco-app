import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ALFRESCO_IONIC_DIRECTIVES } from 'ionic-alfresco';

declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  templateUrl: './file-view.html',
  directives: [ALFRESCO_IONIC_DIRECTIVES]
})
export class FileView {

  nodeId: string;

  constructor(private navParams: NavParams) {
    this.nodeId = navParams.get('nodeId');
  }
}
