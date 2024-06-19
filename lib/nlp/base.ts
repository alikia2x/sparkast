import { NLPResult } from "../onesearch/NLPResult";
import { stopwords } from "./stopwords";

export class NLP {
    result: NLPResult;
    constructor(
        public query: String, 
        public task: String,
        public intentionKeywords?: String[],
    ) { 
        this.result = new NLPResult();
    }
    public removeStopwords(extraStopwords: string[] = [], disableDefault: boolean = false){
        const list = disableDefault ? extraStopwords : stopwords.concat(extraStopwords);
        if (list.includes(this.query.trim())) {
            this.query = "";
        }
        for (let word of list){
            this.query = this.query.replace(new RegExp(`\\b${word}\\b`, 'gi'), '');
        }
    }
    public extractSlots(str: string, useNER = false): string[]{
        const slots: string[] = [];
        
        return slots;
    }
    public trim() {
        this.query = this.query.trim();
        const wordList = this.query.split(" ").filter(word => word !== "");
        this.query = wordList.join(" ");
    }
}