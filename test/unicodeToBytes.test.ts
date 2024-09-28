import { expect, test } from "bun:test";
import unicodeToBytes from "../lib/nlp/tokenize/unicodeToBytes";

test("unicodeToBytes: test", () => {
	const byteToUnicodeMap = unicodeToBytes();
	const byteNumArray: number[] = [];
	const stringToConvert = "å¤©æ°Ķ";
	for (let i = 0; i < stringToConvert.length; i++) {
        const chr = stringToConvert[i];
        const byteNumber = byteToUnicodeMap[chr];
        byteNumArray.push(byteNumber);
    }
    const byteArray = new Uint8Array(byteNumArray);
	const decoder = new TextDecoder('utf-8');
    const utf8String = decoder.decode(byteArray);
    expect(utf8String).toEqual("天气")
});
