import { toASCII } from "tr46";
import { getTLD } from "./tldList";

export default function validLink(link: string) {
    let finalURL;
    try {
        const url = new URL(link);
        finalURL = url;
        return true;
    } catch (error) {
        // if the URL is invalid, try to add the protocol
        try {
            const urlWithHTTP = new URL("http://" + link);
            finalURL = urlWithHTTP;
        } catch (error) {
            return false;
        }
    }
    if (
        validTLD(finalURL.host) ||
        isValidIPv6(finalURL.host.slice(1, finalURL.host.length - 1)) ||
        isValidIPv4(finalURL.host)
    ) {
        return true;
    } else {
        return false;
    }
}

export function validTLD(domain: string): boolean {
    if (!domain.includes(".")) return false;
    const tld = toASCII(domain.split(".").reverse()[0]);
    const tldList = getTLD();
    if (tldList.includes(tld.toUpperCase())) {
        return true;
    } else {
        return false;
    }
}

export function isValidIPv6(ip: string): boolean {
    const length = ip.length;
    let groups = 1;
    let groupDigits = 0;
    let doubleColonCount = 0;
    for (let i = 0; i < length; i++) {
        const char = ip[i];
        if ("0" <= char && char <= "9") {
            groupDigits++;
        } else if ("a" <= char && char <= "f") {
            groupDigits++;
        } else if ("A" <= char && char <= "F") {
            groupDigits++;
        } else if (char === ":" && i + 1 < length && ip[i + 1] !== ":") {
            groups++;
            groupDigits = 0;
        } else if (char === ":" && i + 1 < length && ip[i + 1] === ":") {
            doubleColonCount++;
            i++;
            groupDigits = 0;
        } else {
            return false;
        }
        if (groups > 8) {
            return false;
        } else if (groupDigits > 4) {
            return false;
        } else if (doubleColonCount > 1) {
            return false;
        }
    }
    if (doubleColonCount === 0 && groups !== 8) {
        return false;
    }
    return true;
}

export function isValidIPv4(ip: string): boolean {
    const parts = ip.split(".");
    if (parts.length !== 4) {
        return false;
    }
    for (const part of parts) {
        const num = Number(part);
        if (isNaN(num) || num < 0 || num > 255 || !part.match(/^\d+$/)) {
            return false;
        }
    }
    return true;
}
