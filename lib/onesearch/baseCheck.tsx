import slotExtract from "../nlp/extract";
import removeStopwords from "../nlp/stopwords";
import { NLPResult } from "./NLPResult";
import {Kbd} from "@nextui-org/react";

interface KeywordsDict {
    [key: string]: number;
}

interface IntentionsDict {
    [key: string]: number;
}

export function validBase64(str: string) {
    return str.length % 4 == 0 && /^[A-Za-z0-9+/]+[=]{0,2}$/.test(str);
}

export function base64NLP(str: string) {
    const keywords: KeywordsDict = {
        base64: 1,
        b64: 0.95,
        base: 0.5
    };
    let result = new NLPResult(null, null, 0.0, 0.0);
    for (let keyword of Object.keys(keywords)) {
        const pos = str.trim().indexOf(keyword);
        const l = str.length;
        const w = str.split(" ").length;
        if (w > 1 && (pos === 0 || pos == l)) {
            result.probability += keywords[keyword];
            break;
        }
    }

    const intentions: IntentionsDict = {
        decode: 0.1,
        encode: 1
    };
    for (let intention of Object.keys(intentions)) {
        const pos = str.trim().indexOf(intention);
        const w = str.split(" ").length;
        if (w > 1 && pos !== -1) {
            result.confidence += intentions[intention];
            result.intention = `base64.${intention}`;
            break;
        }
    }
    
    let processedQuery = str;
    if (result.intention==="base64.encode"){
        const blacklist = Object.keys(keywords).concat(Object.keys(intentions)).concat([
            "convert", "turn"
        ]);
        processedQuery = slotExtract(str,blacklist);
    } else if (result.intention==="base64.decode") {
        processedQuery = removeStopwords(str, Object.keys(keywords).concat(Object.keys(intentions))).trim();
    }
    if (result.intention === "base64.decode"){
        if (validBase64(processedQuery)) {
            result.confidence = 1;
        } else {
            result.confidence = 0;
        }
    }
    else if (validBase64(processedQuery) && result.intention !== "base64.encode") {
        console.log("!!");
        result.intention = "base64.decode";
        result.confidence += Math.max(1 / Math.log2(1 / processedQuery.length) + 1, 0);
        result.probability += Math.max(1 / Math.log2(1 / processedQuery.length) + 1, 0);
    }

    switch (result.intention) {
        case "base64.encode":
            result.suggestion = btoa(processedQuery);
            result.prompt = <span>Base64 Encode (Hit <Kbd keys={["enter"]}></Kbd> to copy):</span>;
            break;
        case "base64.decode":
            if (result.confidence > 0.1)
                result.suggestion = atob(processedQuery);
                result.prompt = <span>Base64 Decode (Hit <Kbd keys={["enter"]}></Kbd> to copy):</span>;
            break;
        default:
            break;
    }

    return result;
}
