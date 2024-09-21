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
import fs from "node:fs";
import * as fflate from "fflate";

let zh: TrainData = {};
let en: TrainData = {};

type TrainData = {
	[key: string]: string[];
};

export async function trainIntentionModel() {
	try {
		const dataZH = fs.readFileSync("./lib/nlp/data/zh.json", "utf8");
		const dataEN = fs.readFileSync("./lib/nlp/data/en.json", "utf8");
		zh = JSON.parse(dataZH);
		en = JSON.parse(dataEN);
	} catch (err) {
		console.error(err);
	}

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
	// Adds the utterances and intents for the NLP

	for (const key in zh) {
		for (const value of zh[key]) {
			manager.add("zh", value, key);
		}
	}

	for (const key in en) {
		for (const value of en[key]) {
			manager.add("en", value, key);
		}
	}

	await manager.train();

	const resultModel = manager.toJSON();

	const buf = fflate.strToU8(JSON.stringify(resultModel));

	const gzipped = fflate.gzipSync(buf, {
		filename: "model.json",
		mtime: new Date().getTime()
	});

	fs.writeFileSync("./public/model", Buffer.from(gzipped));
}

trainIntentionModel();
