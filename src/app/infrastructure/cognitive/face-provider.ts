import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FaceProvider {

    constructor() { }

    async fetchFaceAPI(PhotoBynary: Blob){
        const subscriptionKey = '2e9d3a2d840c437bbc9a60ceabc62975';
        const uriBase = "https://japaneast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=emotion";
        console.log(PhotoBynary)
        const response = await fetch(uriBase, {
            method: "POST",
            //body: '{"url": ' + '"' + imageUrl + '"}',
            body:PhotoBynary,
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type': 'application/octet-stream',
                "Ocp-Apim-Subscription-Key": subscriptionKey 
            }
        });

        return await response.json();
    };
}
