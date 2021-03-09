import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelpModalComponent } from '../../component/help-modal/help-modal.component';
import { Platform } from '@ionic/angular';
import { ClassifyDeviceComponent } from '../../../common/function/classify-device/classify-device.component';
import { SocialSharingComponent } from '../../../common/function/social-sharing/social-sharing.component'

import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [ClassifyDeviceComponent,SocialSharingComponent]
})
export class Tab3Page {

  constructor(
    public modalController: ModalController,
    public platform: Platform,
    private classifyDevice:ClassifyDeviceComponent,
    private share:SocialSharingComponent,
    private speechRecognition: SpeechRecognition,
  ) {}

  ngOnInit() {
    if(this.classifyDevice.isDesktop()){
      var chartArea=<HTMLCanvasElement>document.getElementById("chartTextEmotion");
      chartArea.height=70
    }
  }

  wordInput:string
  wordOutput:string
  /*
  positiveScore:number
  negativeScore:number
  neutralScore:number
  */

  async presentHelpModal() {
    console.log("helpModal");
    const modal = await this.modalController.create({
      component: HelpModalComponent,
      componentProps: {
        'overview': 'On this page you can analyze the emotions of your text',
        'howToInput': 'Input text and press the right bottom, then this app analyzes your text',
        'howToShare': 'It is also possible to share the analyzed text on SNS'
      }
    });
    return await modal.present();
  }

  isNotText():boolean{
    return (this.wordInput===undefined) || (this.wordInput==="")
  }

  async textAnalyze(){

    if(this.isNotText()){
      alert("Please input text")
      return
    }

    const subscriptionKey = '52c07de179ae49059e755834cb444a86';
    //const uriBase = "https://japaneast.api.cognitive.microsoft.com/text/analytics/v2.1/sentiment";
    const uriBase = "https://japaneast.api.cognitive.microsoft.com/text/analytics/v3.1-preview.1/sentiment";

    let documents = {
      'documents': [
          { 'id': '1', 'text': this.wordInput }
      ]
    };

    let bodyMessage = JSON.stringify(documents);
    //alert(bodyMessage)

    const response = await fetch(uriBase, {
        method: "POST",
        body:bodyMessage,
        headers: {
            'Content-Type': 'application/json', 
            "Ocp-Apim-Subscription-Key": subscriptionKey
        }
    });

    var data = await response.json();
    this.setScore(data)
    var emotion: number[] = this.pullEmotion(data)
    this.barChartMethod(emotion)
  }

  pullEmotion(data):number[]{
    var emotion: number[] = Array(3);

    emotion[0] = this.cutDown(data.documents[0].documentScores.positive)
    emotion[1] = this.cutDown(data.documents[0].documentScores.negative)
    emotion[2] = this.cutDown(data.documents[0].documentScores.neutral)

    return emotion
  }
  
  async setScore(data){
    this.wordOutput = data.documents[0].sentiment;
    //this.positiveScore = this.cutDown(data.documents[0].documentScores.positive)
    //this.negativeScore = this.cutDown(data.documents[0].documentScores.negative)
    //this.neutralScore = this.cutDown(data.documents[0].documentScores.neutral)
  }

  @ViewChild('barCanvas', {static: false}) barCanvas;
  barChart: any;

  barChartMethod(emotion) {

    var positive = emotion[0]
    var negative = emotion[1]
    var neutral = emotion[2]

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['positive', 'negative', 'neutral'],
        datasets: [{
          //label: '# of Votes',
          data: [positive,negative,neutral],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
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

  cutDown(num){
    num = num * 100;
    return Math.round(num);
  }

  shareFacebookText(){
    if(this.isNotText()) {
      alert("Please input text")
      return
    } 
    this.share.shareFacebookText(this.wordInput)
  }

  shareTwitterText(){
    if(this.isNotText()) {
      alert("Please input text")
      return
    } 
    this.share.shareTwitterText(this.wordInput)
  }

  shareOtherText(){
    if(this.isNotText()) {
      alert("Please input text")
      return
    } 
    this.share.shareText(this.wordInput)
  }

  /*
  useMic(){
    available:String
    this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => console.log(available))

    this.micPermission
    
    let options = {
      language:"en-US",
      matches:5,
      prompt:"",      // Android only
      showPopup:true,  // Android only
      showPartial:false 
    }
      
    this.speechRecognition.startListening(options)
      .subscribe(
        (matches: string[]) => this.wordInput=matches[0]
      )
  
  }

  micPermission(){
    // Check permission
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => console.log(hasPermission))

    // Request permissions
    this.speechRecognition.requestPermission()
      .then(
        () => console.log('Granted'),
        () => console.log('Denied')
      )
  }
  */
}
