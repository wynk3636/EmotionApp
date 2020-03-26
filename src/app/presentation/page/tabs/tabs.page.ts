import { Component } from '@angular/core';
import { FeedbackPopoverComponent } from '../../component/feedback-popover/feedback-popover.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public popoverController: PopoverController) {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FeedbackPopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
