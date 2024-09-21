import { suggestionItem } from "global";

interface keywordLinkDict {
	[key: string]: string;
}

const dict_en: keywordLinkDict = {
	about: "/about"
};

const dict_cn: keywordLinkDict = {
	关于: "/about"
};

export function keywordSuggestion(query: string) {
	for (const keyword in dict_cn) {
		if (query.includes(keyword)) {
			const result: suggestionItem = {
				type: "inpage-link",
				suggestion: dict_cn[keyword],
				prompt: keyword,
				relevance: 3000
			};
			return result;
		}
	}
	for (const keyword in dict_en) {
		if (query.includes(keyword)) {
			const result: suggestionItem = {
				type: "inpage-link",
				suggestion: dict_en[keyword],
				prompt: keyword,
				relevance: 3000
			};
			return result;
		}
	}
	return null;
}
