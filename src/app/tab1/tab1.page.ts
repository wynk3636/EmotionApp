import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { ClassifyDeviceComponent } from '../classify-device/classify-device.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [ClassifyDeviceComponent]
})
export class Tab1Page {

  constructor
  (
    private router: Router,
    private admobFree: AdMobFree,
    private classifyDevice:ClassifyDeviceComponent
  ) 
  {

  }

  ngOnInit() {
    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-3818394711346045/9686404636',
      isTesting: false,
      autoShow: true
     };
     this.admobFree.banner.config(bannerConfig);
     
     this.admobFree.banner.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => console.log(e));
  }

  moveFaceEmotionPage(){
    this.router.navigate(["./tabs/tab2"]);
  }

  moveTextEmotionPage(){
    this.router.navigate(["./tabs/tab3"]);
  }
}
