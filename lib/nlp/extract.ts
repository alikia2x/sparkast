export default function slotExtract(str: string, keywords: string[]) {
    let r = str;
    for (let keyword of keywords) {
        r = r.replace(keyword, "");
    }
    return r.trim();
}
