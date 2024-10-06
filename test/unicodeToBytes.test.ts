import { expect, test } from "bun:test";
import unicodeToBytes from "../lib/nlp/tokenize/unicodeToBytes";

test("unicodeToBytes: test", () => {
	expect(unicodeToBytes("HelloĠä½łå¥½")).toEqual("Hello 你好");
});
