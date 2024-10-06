import BPETokenizer from "./BPEtokenizer";

async function tokenize(text: string, tokenizer: BPETokenizer) {
	return tokenizer.tokenize(text);
}

export default tokenize;
