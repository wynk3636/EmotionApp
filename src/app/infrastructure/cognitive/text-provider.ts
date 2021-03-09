import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TextProvider {

    constructor() { }

    async fetchTextAnalytics(wordInput:string){

        const subscriptionKey = '52c07de179ae49059e755834cb444a86';
        //const uriBase = "https://japaneast.api.cognitive.microsoft.com/text/analytics/v2.1/sentiment";
        const uriBase = "https://japaneast.api.cognitive.microsoft.com/text/analytics/v3.1-preview.1/sentiment";

        let documents = {
            'documents': [
                { 'id': '1', 'text': wordInput }
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

        return await response.json();
    }
}
