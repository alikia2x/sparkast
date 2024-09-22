type TokenDict = { [key: string]: number };

function tokenize(query: string, tokenDict: TokenDict): number[] {
	const tokenIds: number[] = [];
	let index = 0;

	// Replace spaces with "▁"
	query = "▁" + query.replace(/ /g, "▁");
	query = query.replace(/\n/g, "<0x0A>");

	while (index < query.length) {
		let bestToken = null;
		let bestLength = 0;

		// Step 2: Find the longest token that matches the beginning of the remaining query
		for (const token in tokenDict) {
			if (query.startsWith(token, index) && token.length > bestLength) {
				bestToken = token;
				bestLength = token.length;
			}
		}

		if (bestToken) {
			tokenIds.push(tokenDict[bestToken]);
			index += bestLength;
			continue;
		}

		// Step 3: Handle the case where no token matches
		const char = query[index];
		if (char.charCodeAt(0) <= 127) {
			// If the character is ASCII, and it doesn't match any token, treat it as an unknown token
			console.error(`Unknown token: ${char}`);
            index++;
            continue;
		}

		// If the character is non-ASCII, convert it to a series of bytes and match each byte
		const bytes = new TextEncoder().encode(char);
		for (const byte of bytes) {
			const byteToken = `<0x${byte.toString(16).toUpperCase()}>`;
			if (tokenDict[byteToken] === undefined) {
                console.error(`Unknown byte token: ${byteToken}`);
                index++;
                continue;
			}
            tokenIds.push(tokenDict[byteToken]);
		}
		index++;
	}

	return tokenIds;
}

export default tokenize;
export type { TokenDict };
