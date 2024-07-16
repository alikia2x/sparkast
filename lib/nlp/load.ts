// @ts-ignore
import { containerBootstrap } from "@nlpjs/core";
// @ts-ignore
import { Nlp } from "@nlpjs/nlp";
// @ts-ignore
import { NluManager, NluNeural } from "@nlpjs/nlu";
// @ts-ignore
import { LangEn } from "@nlpjs/lang-en-min";
// @ts-ignore
import { LangZh } from "@nlpjs/lang-zh";
import * as fflate from 'fflate';

export interface NLUType {
    manager: any;
    inited: boolean;
    loadIntentionModel(): Promise<void>;
    init(): Promise<this>;
    process(lang: string, text: string): Promise<any>;
}


export class NLU {
    manager: any;
    inited: boolean = false;
    async loadIntentionModel() {
        const container = await containerBootstrap();
        container.use(Nlp);
        container.use(LangEn);
        container.use(LangZh);
        container.use(NluNeural);
        const manager = new NluManager({
            container,
            locales: ["en", "zh"],
            nlu: {
                useNoneFeature: true
            }
        });
        const response = await fetch("/model");
          
        const responseBuf = await response.arrayBuffer();
        const compressed = new Uint8Array(responseBuf);
        const decompressed = fflate.decompressSync(compressed);
        const modelText = fflate.strFromU8(decompressed);
        manager.fromJSON(JSON.parse(modelText));
        this.manager = manager;
    }
    async init() {
        await this.loadIntentionModel();
        this.inited = true;
        return this;
    }
    async process(lang: string, text: string): Promise<any> {
        const actual = await this.manager.process(lang, text);
        return actual;
    }
}