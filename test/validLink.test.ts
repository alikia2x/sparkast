import {describe, expect, test} from '@jest/globals';
import validLink from "../lib/url/validLink";

test("Plain, full URL", () => {
    expect(validLink("https://example.com/about-us")).toBe(true);
});