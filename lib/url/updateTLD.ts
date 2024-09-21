const response = await fetch("https://data.iana.org/TLD/tlds-alpha-by-domain.txt");
const tldText = await response.text();
await Bun.write("./lib/url/tlds.txt", tldText);
