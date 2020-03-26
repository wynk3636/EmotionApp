import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';

import { HelpModalComponent } from './presentation/component/help-modal/help-modal.component';
import { FeedbackPopoverComponent } from './presentation/component/feedback-popover/feedback-popover.component';
import { ClassifyDeviceComponent } from './common/function/classify-device/classify-device.component'
import { SocialSharingComponent } from './common/function/social-sharing/social-sharing.component'
import { FormsModule }   from '@angular/forms';

import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';


@NgModule({
  declarations: [AppComponent,
                 HelpModalComponent,
                 FeedbackPopoverComponent,
                 ClassifyDeviceComponent,
                 SocialSharingComponent,
                ],
  entryComponents: [HelpModalComponent,
                    FeedbackPopoverComponent,
                    ClassifyDeviceComponent,
                    SocialSharingComponent,
                   ],
  imports: [
            BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            FormsModule
           ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    Camera,
    SpeechRecognition,
    GoogleAnalytics,
    FirebaseAnalytics,
    AdMobFree,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  exports:[
           HelpModalComponent,
           FeedbackPopoverComponent,
           ClassifyDeviceComponent,
           SocialSharingComponent
          ],
})
export class AppModule {}
