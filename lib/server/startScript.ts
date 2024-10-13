import { promises as dns } from "node:dns";

// Copied from vite/src/node/utils.ts

/**
 * Returns resolved localhost address when `dns.lookup` result differs from DNS
 *
 * `dns.lookup` result is same when defaultResultOrder is `verbatim`.
 * Even if defaultResultOrder is `ipv4first`, `dns.lookup` result maybe same.
 * For example, when IPv6 is not supported on that machine/network.
 */
export async function getLocalhostAddressIfDiffersFromDNS(): Promise<string | undefined> {
	const [nodeResult, dnsResult] = await Promise.all([
		dns.lookup("localhost"),
		dns.lookup("localhost", { verbatim: true })
	]);
	const isSame =
		nodeResult.family === dnsResult.family && nodeResult.address === dnsResult.address;
	return isSame ? undefined : nodeResult.address;
}

export const wildcardHosts = new Set(["0.0.0.0", "::", "0000:0000:0000:0000:0000:0000:0000:0000"]);
