import { expect, test } from "bun:test";
import bytesToUnicodes from "../lib/nlp/tokenize/bytesToUnicode";

test("bytesToUnicode: test", () => {
	expect(bytesToUnicodes("Hello 你好")).toEqual("HelloĠä½łå¥½");
});
