import { AutoTokenizer, env } from "@xenova/transformers";

async function tokenize(text: string, model: string, mirror: boolean = false, remote: boolean = true) {
	if (mirror) {
		env.remoteHost = "https://hf-mirror.com";
	}
	if (!remote) {
		env.allowRemoteModels = false;
	}
	const tokenizer = await AutoTokenizer.from_pretrained(model);
	const { input_ids } = await tokenizer(text);
	const tokenIds = [];
	for (let id of input_ids.data) {
		tokenIds.push(parseInt(id));
	}
	return tokenIds;
}

export default tokenize;