import { validBase64 } from "@/lib/onesearch/baseCheck";
import { describe, expect, test } from "@jest/globals";

describe("To auto-detect the intention of decoding an base64 string", () => {
    test("Implicit declaration", () => {
        expect(validBase64("MjM6MjQgQXByIDI1LCAyMDI0")).toBe(true);
    });
});
