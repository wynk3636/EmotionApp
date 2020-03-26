import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-feedback-popover',
  templateUrl: './feedback-popover.component.html',
  styleUrls: ['./feedback-popover.component.scss'],
})
export class FeedbackPopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController) { }

  evaluation:boolean
  feedbackText=""
  goodIconColor = "dark"
  badIconColor = "dark"
  canNotSend = true

  dismissPopover(){
    this.popoverController.dismiss();   
  }

  good(){
    this.goodIconColor = "primary"
    this.badIconColor = "dark"
    this.evaluation = true
    this.canNotSend = false
  }
  bad(){
    this.goodIconColor = "dark"
    this.badIconColor = "primary"
    this.evaluation = false
    this.canNotSend = false
  }

  async sendFeedback(){
    const evaluationUrl = "https://w3p76muk55.execute-api.ap-northeast-1.amazonaws.com/default/registerEvaluation"
    let feedback = this.makeFeedback()
    //alert(feedback)
    const response = await fetch(evaluationUrl, {
        method: "POST",
        body:feedback,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    var data = await response.json();
    //alert(JSON.stringify(data, null, 2));
    this.dismissPopover()
  }

  makeFeedback(){
    let documents = {
      'documents': [
          { 
           'evaluation': this.evaluation,
           'feedbackText': this.feedbackText 
          }
      ]
    };

    return JSON.stringify(documents);
  }

  ngOnInit() {}

}
