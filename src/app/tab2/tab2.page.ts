import { Component,ViewChild} from '@angular/core';
//import { Component, ViewChild, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { HelpModalComponent } from '../help-modal/help-modal.component';
import { ClassifyDeviceComponent } from '../classify-device/classify-device.component';
import { SocialSharingComponent } from '../social-sharing/social-sharing.component'

import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [ClassifyDeviceComponent,SocialSharingComponent]
})

export class Tab2Page {
  shootPhoto: string | ArrayBuffer;
  PhotoBynary: Blob;

  constructor(
    private camera:Camera,
    private modalController: ModalController,
    private classifyDevice:ClassifyDeviceComponent,
    private share:SocialSharingComponent,
  ) {}

  ngOnInit() {
    if(this.classifyDevice.isDesktop()){
      var chartArea=<HTMLCanvasElement>document.getElementById("chartImageEmotion");
      chartArea.height=70
    }
    else{
      var chartArea=<HTMLCanvasElement>document.getElementById("imagePhoto");
      chartArea.height=200
    }
  }

  async presentHelpModal() {
    const modal = await this.modalController.create({
      component: HelpModalComponent,
      componentProps: {
        'overview': 'On this page you can analyze the emotions of the people in the image',
        'howToInput': 'Take a photo or select a photo in storage, then this app analyzes the image',
        'howToShare': 'It is also possible to share the analyzed photos on SNS'
      }
    });
    return await modal.present();
  }

  shareFacebookImage(){
    this.share.shareFacebookImage(this.shootPhoto)
  }

  shareInstagramImage(){
    this.share.shareInstagramImage(this.shootPhoto)
  }

  shareTwitterImage(){
    this.share.shareTwitterImage(this.shootPhoto)
  }

  shareOtherImage(){
    this.share.shareImage(this.PhotoBynary)  
  }

  takePhoto(){
    if(this.classifyDevice.isDesktop()){
      alert("This Device can not able to use Camera...");
      return
    }

    const options:CameraOptions = {
      saveToPhotoAlbum:true,
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL, //Binary get
      //destinationType:this.camera.DestinationType.FILE_URI, //FileUri get
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) =>{
      this.shootPhoto = 'data:image/jpeg;base64,' + imageData;
      this.PhotoBynary  = this.makeblob(this.shootPhoto);
      this.callFaceAPI()
    });
  }

  getStoragePhoto(){
    if(this.classifyDevice.isDesktop()){
      var input_file = document.getElementById("selectFile");
      input_file.click();
      return
    }

    const options:CameraOptions = {
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM, //Storage Select
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL, //Binary get
      //destinationType:this.camera.DestinationType.FILE_URI, //FileUri get
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) =>{
      this.shootPhoto = 'data:image/jpeg;base64,' + imageData;
      this.PhotoBynary  = this.makeblob(this.shootPhoto);
      this.callFaceAPI()
    });
  }

  onChangeInput(evt) {
    var reader = new FileReader();
    const file = evt.target.files[0];
    reader.onload = ((e) => {
      this.shootPhoto = e.target['result'];
      this.PhotoBynary  = this.makeblob(this.shootPhoto);
      this.callFaceAPI()
    });
    reader.readAsDataURL(file);
   }

  async callFaceAPI(){
    const subscriptionKey = '2e9d3a2d840c437bbc9a60ceabc62975';
    const uriBase = "https://japaneast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=emotion";
    console.log(this.PhotoBynary)
    const response = await fetch(uriBase, {
        method: "POST",
        //body: '{"url": ' + '"' + imageUrl + '"}',
        body:this.PhotoBynary,
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type': 'application/octet-stream',
            "Ocp-Apim-Subscription-Key": subscriptionKey 
        }
    });

    var data = await response.json();
    var emotion: number[] = this.pullEmotion(data)
    this.barChartMethod(emotion);
    //this.addCanvas(data)
  };

  //encode
  makeblob = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  pullEmotion(data):number[]{
    var emotion: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

    data.forEach(function(value){
      emotion[0] = emotion[0] + (value.faceAttributes.emotion.anger);//怒り
      emotion[1] = emotion[1] + (value.faceAttributes.emotion.contempt);//軽蔑
      emotion[2] = emotion[2] + (value.faceAttributes.emotion.disgust);//嫌悪
      emotion[3] = emotion[3] + (value.faceAttributes.emotion.fear);//恐怖
      emotion[4] = emotion[4] + (value.faceAttributes.emotion.happiness);//幸福
      emotion[5] = emotion[5] + (value.faceAttributes.emotion.neutral);//無心
      emotion[6] = emotion[6] + (value.faceAttributes.emotion.sadness);//悲観
      emotion[7] = emotion[7] + (value.faceAttributes.emotion.surprise);//驚愕
    });

    for (var i = 0; i < emotion.length; i++) { 
      emotion[i] = emotion[i] / data.length * 100
    }

    return emotion
  }

  @ViewChild('barCanvas', {static: false}) barCanvas;
  barChart: any;

  barChartMethod(emotion) {
    var anger = emotion[0]
    var contempt = emotion[1]
    var disgust = emotion[2]
    var fear = emotion[3]
    var happiness = emotion[4]
    var neutral = emotion[5]
    var sadness = emotion[6]
    var surprise = emotion[7]

    /*
    anger = 100
    contempt = 100
    disgust = 100
    fear = 100
    happiness = 100
    neutral = 100
    sadness = 100
    surprise = 100
    */

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['anger', 'contempt', 'disgust', 'fear', 'happiness', 'neutral', 'sadness ', 'surprise'],
        datasets: [{
          //label: '# of Votes',
          data: [anger, contempt, disgust, fear, happiness, neutral, sadness , surprise],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(153, 102, 10, 0.2)',
            'rgba(10, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 10, 1)',
            'rgba(10, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        }
      }
    });
  }

  addCanvas(data){
    console.log("addCanvas")
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    var img = new Image()
    img.src = <string>this.shootPhoto;
    img.onload = function()
    {
          context.drawImage(img, 0, 0)
          //context.drawImage(img, 0, 0, canvas.clientWidth, canvas.clientHeight)
          context.strokeStyle="red";
          data.forEach(function(value){
            var top = (value.faceRectangle.top);
            var left = (value.faceRectangle.left);
            var width = (value.faceRectangle.width);
            var height = (value.faceRectangle.height);
            context.strokeRect(left,top,width,height);
            //context.strokeRect (660,215,142,142);
          });
    }
  }  
}