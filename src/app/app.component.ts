import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { ClassifyDeviceComponent } from './classify-device/classify-device.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [ClassifyDeviceComponent]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ga: GoogleAnalytics,
    private firebaseAnalytics: FirebaseAnalytics,
    private classifyDevice:ClassifyDeviceComponent,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    if(this.classifyDevice.isDesktop()){
      this.ga.startTrackerWithId('UA-156098485-1')
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackView('test');
          // Tracker is ready
          // You can now track pages or set additional information such as AppVersion or UserId
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e)
      );
    }
    else{
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.firebaseAnalytics.logEvent('page_view', {page: "dashboard"}); // 追加
      });
    }
  }
}
