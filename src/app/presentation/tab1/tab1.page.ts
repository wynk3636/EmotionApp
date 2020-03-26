import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { ClassifyDeviceComponent } from '../../common/function/classify-device/classify-device.component';

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

  private admobId:string
  ngOnInit() {
    this.setAdmobId()
    this.setAdmobConf();

    this.showAdmob();
  }

  private showAdmob() {
    this.admobFree.banner.prepare()
      .then(() => {
        //alert("ok")
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => {
          console.log("admobError" + e);
          //alert("no");
        }
      );
  }
  private setAdmobConf() {
     const bannerConfig: AdMobFreeBannerConfig = {
      id: this.admobId,
      isTesting: true,
      autoShow: true
     };
     this.admobFree.banner.config(bannerConfig);
  }

  private setAdmobId() {
    if(this.classifyDevice.isAndroid()){
      this.admobId = 'ca-app-pub-3818394711346045/9686404636'
    }
    else if(this.classifyDevice.isIos()){
      this.admobId = 'ca-app-pub-3818394711346045~3765548446';
    }
  }

  moveFaceEmotionPage(){
    this.router.navigate(["./tabs/tab2"]);
  }

  moveTextEmotionPage(){
    this.router.navigate(["./tabs/tab3"]);
  }
}
