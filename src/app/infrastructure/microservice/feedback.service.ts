import { Injectable } from '@angular/core';
import { Feedback } from '../../domain/Entity/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private feedback:Feedback) { }

  async sendFeedback(){
    const evaluationUrl = "https://w3p76muk55.execute-api.ap-northeast-1.amazonaws.com/default/registerEvaluation"
    //alert(this.feedback.generateJson())
    const response = await fetch(evaluationUrl, {
        method: "POST",
        body:this.feedback.generateJson(),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    //var data = await response.json();
    //alert(JSON.stringify(data, null, 2));

    return await response.json();
  }
}
