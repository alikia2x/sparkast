import { useEffect, useRef, useState } from "react";
import SuggestionBox from "./suggestionBox";
import { queryAtom } from "lib/state/query";
import { suggestionItem, suggestionsResponse } from "global";
import getSearchEngineName from "lib/onesearch/getSearchEngineName";
import PlainSearch from "./plainSearch";
import { suggestionAtom } from "lib/state/suggestion";
import validLink from "lib/url/validLink";
import Link from "./link";
import { selectedSuggestionAtom } from "lib/state/suggestionSelection";
import { settingsAtom } from "lib/state/settings";
import PlainText from "./plainText";
import { sendError } from "lib/telemetering/sendError";
import { NLU } from "lib/nlp/load";
import { handleNLUResult } from "./handleNLUResult";
import { useAtom, useAtomValue } from "jotai";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export default function OneSearch() {
    const [suggestion, setFinalSuggetsion] = useAtom(suggestionAtom);
    const [manager, setManager] = useState(null);
    const lastRequestTimeRef = useRef(0);
    const selected = useAtomValue(selectedSuggestionAtom);
    const settings = useAtomValue(settingsAtom);
    const devMode = true;
    const query = useAtomValue(queryAtom);
    const engineName = getSearchEngineName();
    const engine = settings.currentSearchEngine;
    const { t } = useTranslation("Search");
    const lang = i18next.language;

    useEffect(() => {
        const time = new Date().getTime().toString();
        if (query.trim() === "" || query.length > 120) {
            cleanSuggestion("QUERY", "NAVIGATION");
            return;
        }
        fetch(`/api/suggestion?q=${query}&l=${lang}&t=${time}&engine=${engine}`)
            .then((res) => res.json())
            .then((data: suggestionsResponse) => {
                try {
                    const suggestionToUpdate: suggestionItem[] = data.suggestions;
                    if (data.time > lastRequestTimeRef.current) {
                        cleanSuggestion("NAVIGATION", "QUERY");
                        lastRequestTimeRef.current = data.time;
                        updateSuggestion(suggestionToUpdate);
                    }
                } catch (error: Error | unknown) {
                    if (error instanceof Error) {
                        sendError(error);
                    }
                }
            })
            .catch((error) => {
                // Handle fetch error
                sendError(error);
            });
    }, [query]);

    function updateSuggestion(data: suggestionItem[]) {
        setFinalSuggetsion((cur: suggestionItem[]) => {
            const types: string[] = [];
            for (const sug of data) {
                if (!types.includes(sug.type)) types.push(sug.type);
            }
            for (const type of types) {
                cur = cur.filter((item) => {
                    return item.type !== type;
                });
            }
            return cur.concat(data).sort((a, b) => {
                return b.relevance - a.relevance;
            });
        });
    }

    function cleanSuggestion(...types: string[]) {
        setFinalSuggetsion((suggestion: suggestionItem[]) => {
            return suggestion.filter((item) => {
                return !types.includes(item.type);
            });
        });
    }

    const NLUModel = new NLU();

    useEffect(() => {
        NLUModel.init().then((nlu) => {
            setManager(nlu.manager);
            console.log(nlu.manager);
        });
    }, []);

    useEffect(() => {
        cleanSuggestion("default-link", "default", "text");
        if (validLink(query)) {
            updateSuggestion([
                { type: "default-link", suggestion: query, relevance: 3000, prompt: <span>Go to: </span> },
                { type: "default", suggestion: query, relevance: 1600 }
            ]);
        } else {
            updateSuggestion([
                {
                    type: "default",
                    suggestion: query,
                    relevance: 2000
                }
            ]);
        }

        if (manager != null) {
            // @ts-ignore
            manager.process(query).then((result) => {
                console.log(result);
                handleNLUResult(result, updateSuggestion);
            });
        }
    }, [query, engineName]);

    return (
        <SuggestionBox>
            {suggestion.map((s, i) => {
                if (s.suggestion.trim() === "") return;
                if (s.type === "default") {
                    return (
                        <PlainSearch key={i} query={s.suggestion} selected={i == selected}>
                            {s.suggestion}&nbsp;
                            <span className="text-zinc-700 dark:text-zinc-400 text-sm">
                                {t("search-help-text", { engine: engineName })}
                            </span>
                            {devMode && (
                                <span className="absolute text-zinc-700 dark:text-zinc-400 text-sm leading-10 h-10 right-2">
                                    {s.relevance}
                                </span>
                            )}
                        </PlainSearch>
                    );
                } else if (s.type === "QUERY") {
                    return (
                        <PlainSearch key={i} query={s.suggestion} selected={i == selected}>
                            {s.suggestion}
                            {devMode && (
                                <span className="absolute text-zinc-700 dark:text-zinc-400 text-sm leading-10 h-10 right-2">
                                    {s.relevance}
                                </span>
                            )}
                        </PlainSearch>
                    );
                } else if (s.type === "NAVIGATION" || s.type === "default-link") {
                    return (
                        <Link key={i} query={s.suggestion} selected={i == selected}>
                            {s.prompt && <span className="text-zinc-700 dark:text-zinc-400">{s.prompt}</span>}
                            {s.suggestion}
                            {devMode && (
                                <span className="absolute text-zinc-700 dark:text-zinc-400 text-sm leading-10 h-10 right-2">
                                    {s.relevance}
                                </span>
                            )}
                        </Link>
                    );
                } else if (s.type === "text") {
                    return (
                        <PlainText key={i} selected={i == selected}>
                            {s.prompt && <span className="text-zinc-700 dark:text-zinc-400">{s.prompt}</span>}
                            <p>{s.suggestion}</p>
                            {devMode && (
                                <span className="bottom-0 absolute text-zinc-700 dark:text-zinc-400 text-sm leading-10 h-10 right-2">
                                    {s.relevance}
                                </span>
                            )}
                        </PlainText>
                    );
                }
            })}
        </SuggestionBox>
    );
}
