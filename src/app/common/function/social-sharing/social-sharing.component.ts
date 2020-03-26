import { Component, OnInit } from '@angular/core';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import { ClassifyDeviceComponent } from '../classify-device/classify-device.component';

@Component({
  selector: 'app-social-sharing',
  templateUrl: './social-sharing.component.html',
  styleUrls: ['./social-sharing.component.scss'],
  providers: [ClassifyDeviceComponent,]
})
export class SocialSharingComponent implements OnInit {

  constructor(
      private socialSharing:SocialSharing,
      private classifyDevice:ClassifyDeviceComponent,
    ) { }

  ngOnInit() {}

  shareFacebookImage(shootPhoto){
    if((shootPhoto)==null){
      alert("The image does not shown");
    }
    else if(this.classifyDevice.isDesktop()){
      alert("This device can not share image. Please install mobile app");
    }
    else{
      this.socialSharing.shareViaFacebook('',shootPhoto);
    }
  };

  shareInstagramImage(shootPhoto){
    if((shootPhoto)==null){
      alert("The image does not shown");
    }
    else if(this.classifyDevice.isDesktop()){
      alert("This device can not share image. Please install mobile app");
    }
    else{
      this.socialSharing.shareViaInstagram('',shootPhoto);
    }
  };

  shareTwitterImage(shootPhoto){
    if((shootPhoto)==null){
      alert("The image does not shown");
    }
    else if(this.classifyDevice.isDesktop()){
      alert("This device can not share image. Please install mobile app");
    }
    else{
      this.socialSharing.shareViaTwitter('',shootPhoto);
    }
  };

  shareImage(image){
    if((image)==null){
      alert("The image does not shown");
      return
    }

    //let file = new File([image], 'tmp.png', {type: 'image/png'})

    let newVariable: any;
    newVariable = window.navigator;
    newVariable.share({
      text: '',
      url: '',
      files: [image]
    }).then(() => {
      console.log('Share was successful.')
    }).catch((error) => {
      console.log('Sharing failed', error)
    })
  }

  shareFacebookText(text:string){
    if(this.classifyDevice.isDesktop()){
      alert("This device can not share text in facebook. Please install mobile app");
    }
    else{
      this.socialSharing.shareViaFacebook(text);
    }
  }

  shareTwitterText(text:string){
    if(this.classifyDevice.isDesktop()){
      open( "https://twitter.com/intent/tweet?text=" + text, "_blank" )
    }
    else{
      this.socialSharing.shareViaTwitter(text);
    }
  }

  shareText(text:string){
    let newVariable: any;
    newVariable = window.navigator;
    newVariable.share({
      text: text,
      url: '',
      //files: [image]
    }).then(() => {
      console.log('Share was successful.')
    }).catch((error) => {
      console.log('Sharing failed', error)
    })
  }

}
