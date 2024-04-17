import { Suggestion } from "search-engine-autocomplete";

interface settingsType extends Object{
    "version": number,
    "elementBackdrop": boolean,
    "bgBlur": boolean,
    "timeShowSecond": boolean,
    "currentSearchEngine": string,
    "searchInNewTab": boolean,
    "searchEngines": {
        [key: string]: string
    },
};

interface suggestionsResponse extends Object{
    suggestions: Suggestion[],
    query: string,
    verbatimRelevance: number,
    time: number
}

type suggestionItem = {
    suggestion: string,
    type: string,
    relativeRelevance?: number,
    relevance: number
}