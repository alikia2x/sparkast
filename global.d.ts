import { Suggestion } from "search-engine-autocomplete";

interface settingsType extends object {
	version: number;
	elementBackdrop: boolean;
	bgBlur: boolean;
	timeShowSecond: boolean;
	currentSearchEngine: string;
	searchInNewTab: boolean;
	searchEngines: {
		[key: string]: string;
	};
}

interface suggestionsResponse extends object {
	suggestions: Suggestion[];
	query: string;
	verbatimRelevance: number;
	time: number;
}

type suggestionItem = {
	suggestion: string;
	type: string;
	relativeRelevance?: number;
	relevance: number;
	prompt?: string | React.ReactElement;
	intention?: string | null;
	probability?: number;
	confidence?: number;
};
