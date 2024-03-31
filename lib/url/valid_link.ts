import punycode from "punycode/";
import { tldList } from "./tld_list";

export default function validLink(link: string) {
    let finalURL = '';
    try {
        const url = new URL(link);
        finalURL = url.origin;
    } catch (error) {
        // if the URL is invalid, try to add the protocol
        try {
            const urlWithHTTP = new URL("http://" + link);
            finalURL = urlWithHTTP.origin;
        } catch (error) {
            return false;
        }
    }
    if (validTLD(finalURL)) {
        return true;
    } else {
        return false;
    }
}

function validTLD(domain: string): boolean {
    const tld = punycode.toUnicode(domain.split(".").reverse()[0]);
    console.log(tld);
    if (tldList.includes(tld)) {
        return true;
    } else {
        return false;
    }
}
