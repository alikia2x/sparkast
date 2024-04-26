import { settingsType, suggestionItem } from "@/global";
import { normalizeURL } from "@/lib/normalizeURL";
import search from "@/lib/search";

export default function (index: number, suggestion: suggestionItem[], query: string, settings: settingsType) {
    const selected = suggestion[index];
    const engine = settings.searchEngines[settings.currentSearchEngine];
    const newTab = settings.searchInNewTab;
    if (selected.type === "QUERY" || selected.type === "default") {
        search(selected.suggestion, engine, newTab);
    } else if (selected.type === "NAVIGATION") {
        window.open(normalizeURL(selected.suggestion));
    }
}
