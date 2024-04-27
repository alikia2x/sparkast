import { base64NLP } from "@/lib/onesearch/baseCheck";
import { describe, expect, test } from "@jest/globals";

describe("To auto-detect the intention of decoding an base64 string", () => {
    test("Implicit declaration", () => {
        expect(base64NLP("base64 encode encode MjM6MjQgQXByIDI1LCAyMDI0").intention).toBe("base64.encode");
        expect(base64NLP("base64 encode encode MjM6MjQgQXByIDI1LCAyMDI0").suggestion).toBe(
            "ZW5jb2RlIE1qTTZNalFnUVhCeUlESTFMQ0F5TURJMA=="
        );
    });
});
