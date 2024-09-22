import { AutoTokenizer, env } from "@xenova/transformers";

env.allowRemoteModels = false;
env.localModelPath = "/transformers/";

async function tokenize(text: string, model: string) {
	const tokenizer = await AutoTokenizer.from_pretrained(model);
	const { input_ids } = await tokenizer(text);
	const tokenIds = [];
	for (let id of input_ids.data) {
		tokenIds.push(parseInt(id));
	}
	return tokenIds;
}

export default tokenize;