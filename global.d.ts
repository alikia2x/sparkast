import { Suggestion } from "search-engine-autocomplete";

type settings = {
    version: number;
    elementBackdrop: boolean;
    bgBlur: boolean;
    timeShowSecond: boolean;
    currentSearchEngine: string;
    searchEngines: {
        [key: string]: string,
    };
};

type suggestionsResponse = {
    suggestions: Suggestion[],
    query: string,
    verbatimRelevance: number,
    time: number
}