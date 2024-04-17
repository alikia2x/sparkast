import { useEffect, useState } from "react";
import SuggestionBox from "./suggestionBox";
import { useRecoilValue } from "recoil";
import { queryState } from "@/components/state/query";
import { useLocale, useTranslations } from "next-intl";
import { suggestionItem, suggestionsResponse } from "@/global";
import getSearchEngineName from "@/lib/getSearchEngineName";
import PlainSearch from "./plainSearch";

export default function () {
    const [suggestion, setFinalSuggetsion] = useState([] as suggestionItem[]);
    const [selected, setSelected] = useState(0);
    const [lastUpdate, setLastUpdate] = useState(0);
    const [cloudLastUpdate, setCloudLastUpdate] = useState(0);
    const [clientLastUpdate, setClientLastUpdate] = useState(0);
    const devMode = true;
    const query = useRecoilValue(queryState);
    const engineName = getSearchEngineName();
    const lang = useLocale();
    const t = useTranslations("Search");

    useEffect(() => {
        const time = new Date().getTime().toString();
        if (query.trim() === "") {
            cleanSuggestion("QUERY", new Date().getTime());
            return;
        }
        fetch(`/api/suggestion?q=${query}&l=${lang}&t=${time}`)
            .then((res) => res.json())
            .then((data: suggestionsResponse) => {
                let suggestionToUpdate: suggestionItem[] = data.suggestions;
                if (data.verbatimRelevance) {
                    suggestionToUpdate.push({
                        type: "default",
                        suggestion: query,
                        relevance: data.verbatimRelevance
                    });
                }
                updateSuggestion(suggestionToUpdate, "cloud", data.time);
            });
    }, [query]);

    function setSuggestion(data: suggestionItem[], source: "frontend" | "client" | "cloud", time?: number) {
        let finalSuggestion = data.sort((a, b) => b.relevance - a.relevance);
        finalSuggestion = finalSuggestion.filter(
            (item, index, self) => index === self.findIndex((t) => t.suggestion === item.suggestion)
        );
        setFinalSuggetsion(finalSuggestion);
        const requestUpdateTime = time || new Date().getTime();
        const overwriteLastUpdate = requestUpdateTime > lastUpdate;
        switch (source) {
            case "frontend":
                setLastUpdate(new Date().getTime());
                break;
            case "client":
                setClientLastUpdate(requestUpdateTime);
                if (overwriteLastUpdate) setLastUpdate(new Date().getTime());
            case "cloud":
                setCloudLastUpdate(requestUpdateTime);
                if (overwriteLastUpdate) setLastUpdate(new Date().getTime());
                break;
            default:
                break;
        }
    }

    function updateSuggestion(data: suggestionItem[], source: "frontend" | "client" | "cloud", time?: number) {
        let finalSuggestion = suggestion;
        const types: string[] = [];
        for (let sug of data) {
            if (!types.includes(sug.type)) types.push(sug.type);
        }
        for (let type of types) {
            finalSuggestion = finalSuggestion.filter((item) => {
                return item.type !== type;
            });
        }
        finalSuggestion = finalSuggestion.concat(data);
        setSuggestion(finalSuggestion, source, time);
    }

    function cleanSuggestion(type: string, time?: number){
        let finalSuggestion = suggestion;
        console.log("1",finalSuggestion);
        finalSuggestion = finalSuggestion.filter((item) => {
            return item.type !== type;
        });
        console.log("2",finalSuggestion);
        setSuggestion(finalSuggestion, "frontend", time);
    }

    useEffect(() => {
        updateSuggestion(
            [
                {
                    type: "default",
                    suggestion: query,
                    relevance: 2000
                }
            ],
            "frontend"
        );
    }, [query, engineName]);

    return (
        <SuggestionBox>
            {suggestion.map((s) => {
                if (s.suggestion.trim() === "") return;
                if (s.type === "default") {
                    return (
                        <PlainSearch key={s.suggestion} query={s.suggestion}>
                            {s.suggestion}&nbsp;
                            <span className="text-zinc-700 dark:text-zinc-400 text-sm">
                                {t("search-help-text", { engine: engineName })}
                            </span>
                            {devMode && (
                                <span className="text-zinc-700 dark:text-zinc-400 text-sm">
                                    &nbsp;&nbsp;Relevance: {s.relevance}
                                </span>
                            )}
                        </PlainSearch>
                    );
                } else if (s.type === "QUERY") {
                    return (
                        <PlainSearch key={s.suggestion} query={s.suggestion}>
                            {s.suggestion}
                            {devMode && (
                                <span className="text-zinc-700 dark:text-zinc-400 text-sm">
                                    &nbsp;&nbsp;Relevance: {s.relevance}
                                </span>
                            )}
                        </PlainSearch>
                    );
                }
            })}
        </SuggestionBox>
    );
}
