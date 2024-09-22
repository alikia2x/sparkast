import { describe, expect, test } from "bun:test";
import tokenize from "../lib/nlp/tokenizer";

describe("Test if tokenizer works", () => {
	test("Using without a mirror", async () => {
		let result = await tokenize("你好，世界！", "Qwen/Qwen2.5-3B", false);
		expect(result).toEqual([108386, 3837, 99489, 6313]);
	});
	test("Using with a mirror", async () => {
		let result = await tokenize("你好，世界！", "Qwen/Qwen2.5-3B", true);
		expect(result).toEqual([108386, 3837, 99489, 6313]);
	});
});
