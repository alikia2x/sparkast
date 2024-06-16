import { NLPResult } from "../onesearch/NLPResult";
import { stopwords } from "./stopwords";

class NLP {
    result: NLPResult;
    constructor(
        public query: String, 
        public task: String
    ) { 
        this.result = new NLPResult();
    }
    public removeStopwords(str: string, extraStopwords: string[] = [], disableDefault: boolean = false){
        const list = disableDefault ? extraStopwords : stopwords.concat(extraStopwords);
        for (let word of list){
            str = str.replace(new RegExp(`\\b${word}\\b`, 'gi'), '');
        }
        return str;
    }
}