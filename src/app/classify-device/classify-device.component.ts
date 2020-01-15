import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-classify-device',
  templateUrl: './classify-device.component.html',
  styleUrls: ['./classify-device.component.scss'],
})
export class ClassifyDeviceComponent implements OnInit {

  constructor(
    public platform: Platform,
  ) { }

  ngOnInit() {}

  isDesktop(){
    //console.log(this.platform.platforms())
    if(this.platform.is("desktop")){
      return true;
    }
    else{
      return false;
    }
  }

}
