import { describe, expect, test } from "@jest/globals";
import validLink, { validTLD } from "../lib/url/validLink";

describe("Check if a string is an accessible domain/URL/IP", () => {
    test("Plain, full URL", () => {
        // Plain form
        expect(validLink("http://example.com")).toBe(true);
        // With https and path
        expect(validLink("https://jestjs.io/docs/getting-started/")).toBe(true);
        // With anchor
        expect(validLink("https://difftastic.wilfred.me.uk/zh-CN/git.html#git-difftool")).toBe(true);
        // With params
        expect(validLink("https://www.bilibili.com/list/ml2252204359?oid=990610203&bvid=BV1sx4y1g7Hh")).toBe(true);
    });
    test("Punycode URL", () => {
        expect(validLink("https://原神大学.com/")).toBe(true);
        expect(validLink("中国原神大学.com")).toBe(true);
    });
    test("Invalid TLD with protocol", () => {
        expect(validLink("https://www.example.notexist")).toBe(true);
    });
    test("Invalid TLD with no protocol", () => {
        expect(validLink("www.example.notexist")).toBe(false);
    });
    test("IPv4 without protocol", () => {
        expect(validLink("127.0.0.1")).toBe(true);
    });
    test("IPv6 without protocol", () => {
        expect(validLink("[::]")).toBe(true);
    });
});

// Reference: https://www.iana.org/domains/root/db
describe("Check if the given TLD exist and assigned.", () => {
    test("Valid normal TLD", () => {
        expect(validTLD("com")).toBe(true);
        expect(validTLD("top")).toBe(true);
        expect(validTLD("net")).toBe(true);
        expect(validTLD("org")).toBe(true);
    });
    test("Valid new TLDs", () => {
        // they really exist!
        expect(validTLD("foo")).toBe(true);
        expect(validTLD("bar")).toBe(true);
    });
    test("Exist but not assigned TLD", () => {
        expect(validTLD("active")).toBe(false);
        expect(validTLD("off")).toBe(false);
    });
    test("with dot", () => {
        expect(validTLD(".com")).toBe(true);
        expect(validTLD(".us")).toBe(true);
        expect(validTLD(".cn")).toBe(true);
        expect(validTLD(".io")).toBe(true);
    });
    test("Punycode TLDs", () => {
        expect(validTLD(".中国")).toBe(true);
        expect(validTLD(".РФ")).toBe(true);
        expect(validTLD(".कॉम")).toBe(true);
        expect(validTLD("ایران")).toBe(true);
        expect(validTLD("இலங்கை")).toBe(true);
        expect(validTLD("გე")).toBe(true);
        expect(validTLD("ポイント")).toBe(true);
    });
    test("Punycode TLDs but not assigned", () => {
        expect(validTLD("テスト")).toBe(false);
        expect(validTLD("परीक्षा")).toBe(false);
        expect(validTLD("测试")).toBe(false);
    });
});
