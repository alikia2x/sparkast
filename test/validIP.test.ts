import { describe, expect, test } from "bun:test";
import { isValidIPv4,  } from "../lib/url/validLink";

describe("Check if a string is a valid IPv4", () => {
	test("Invalid IPv4 addresses - Missing part", () => {
		expect(isValidIPv4("192.168.1")).toBe(false);
		expect(isValidIPv4("1")).toBe(false);
	});
	
	test("Invalid IPv4 addresses - Contains non-digit characters", () => {
		expect(isValidIPv4("192.168.1.a")).toBe(false);
		expect(isValidIPv4("192.168.1.1a")).toBe(false);
		expect(isValidIPv4("192.168.1.1.1")).toBe(false);
	});
	
	test("Invalid IPv4 addresses - Contains empty parts", () => {
		expect(isValidIPv4("192.168.1.")).toBe(false);
		expect(isValidIPv4("192..168.1")).toBe(false);
	});
	
	test("Invalid IPv4 addresses - Contains negative numbers", () => {
		expect(isValidIPv4("192.168.-1.1")).toBe(false);
	});
	
	test("Invalid IPv4 addresses - Contains out-of-range numbers", () => {
		expect(isValidIPv4("192.168.256.1")).toBe(false);
		expect(isValidIPv4("192.168.1.256")).toBe(false);
	});
	
	test("Invalid IPv4 addresses - Contains multiple dots", () => {
		expect(isValidIPv4("192.168..1.1")).toBe(false);
		expect(isValidIPv4("192.168.1..1")).toBe(false);
	});
	
	test("Invalid IPv4 addresses - Empty string", () => {
		expect(isValidIPv4("")).toBe(false);
	});
	
	test("Invalid IPv4 addresses - Contains special characters", () => {
		expect(isValidIPv4("192.168.1.1!")).toBe(false);
		expect(isValidIPv4("192.168.1.1 ")).toBe(false);
		expect(isValidIPv4("192.168.1.1\t")).toBe(false);
	});
	
	test("Invalid IPv4 addresses - Contains non-ASCII characters", () => {
		expect(isValidIPv4("192.168.1.1©")).toBe(false);
	});
	
	test("Invalid IPv4 addresses - Contains newline character", () => {
		expect(isValidIPv4("192.168.1.1\n")).toBe(false);
	});
	
	test("Invalid IPv4 addresses - Contains multiple IP addresses", () => {
		expect(isValidIPv4("192.168.1.1 192.168.1.2")).toBe(false);
	});
	
	test("Invalid IPv4 addresses - Contains IPv6 address", () => {
		expect(isValidIPv4("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(false);
	});

	test("Valid IPv4 addresses - Standard IP", () => {
		expect(isValidIPv4("192.168.1.1")).toBe(true);
	});
	
	test("Valid IPv4 addresses - All zeros", () => {
		expect(isValidIPv4("0.0.0.0")).toBe(true);
	});
	
	test("Valid IPv4 addresses - Maximum value", () => {
		expect(isValidIPv4("255.255.255.255")).toBe(true);
	});
	
	test("Valid IPv4 addresses - Leading zero but valid", () => {
		expect(isValidIPv4("192.000.001.001")).toBe(true);
	});
	
	test("Valid IPv4 addresses - Single digit parts", () => {
		expect(isValidIPv4("1.2.3.4")).toBe(true);
	});
});
