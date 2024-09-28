import { expect, test } from "bun:test";
import bytesToUnicode from "../lib/nlp/tokenize/bytesToUnicode";

test("bytesToUnicode: test", () => {
	const byteToUnicodeMap = bytesToUnicode();
	expect(byteToUnicodeMap["206"]).toEqual("Î");
});
