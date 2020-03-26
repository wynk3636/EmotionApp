import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Feedback } from '../../../domain/Entity/feedback';
import { FeedbackService } from '../../../infrastructure/microservice/feedback.service';

@Component({
  selector: 'app-feedback-popover',
  templateUrl: './feedback-popover.component.html',
  styleUrls: ['./feedback-popover.component.scss'],
})
export class FeedbackPopoverComponent implements OnInit {

  constructor
  (
    public popoverController: PopoverController,
    private feedbackService: FeedbackService,
  ) { }

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
    let feedback = new Feedback(this.evaluation, this.feedbackText)
    this.feedbackService = new FeedbackService(feedback)
    this.feedbackService.sendFeedback()

    this.dismissPopover()
  }

  ngOnInit() {}

}
