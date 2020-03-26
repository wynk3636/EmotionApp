export class Feedback {

    constructor
    (
        private evaluation:boolean,
        private feedbackText:string
    )
    {
    }

    generateJson() : string{
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
}
