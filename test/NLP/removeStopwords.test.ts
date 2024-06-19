
import { NLP } from "@/lib/nlp/base";
import { convertStopwords } from "@/lib/nlp/stopwords";
import { describe, expect, test } from "@jest/globals";

describe("Test 1", () => {
    test("basic", () => {
        const nlp = new NLP("please", "remove-stopword");
        nlp.removeStopwords();
        expect(nlp.query).toBe("");
    });
    test("convert something", () => {
        const nlp = new NLP("please convert 1cm to m", "remove-stopword");
        nlp.removeStopwords(convertStopwords);
        nlp.trim();
        expect(nlp.query).toBe("1cm m");
    });
});
