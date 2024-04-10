import { useEffect, useState } from "react";
import SuggestionBox from "./suggestionBox";
import Suggestion from "./suggestion";
import { useRecoilValue } from "recoil";
import { queryState } from "@/components/state/query";
import { Suggestion as SuggestionType, Suggestions } from "search-engine-autocomplete";
import { useLocale } from "next-intl";
import { suggestionsResponse } from "@/global";

export default function () {
    const [suggestion, setSuggetsion] = useState([] as string[]);
    const [lastUpdate, setLastUpdate] = useState(0);
    const query = useRecoilValue(queryState);
    const lang = useLocale();
    useEffect(() => {
        const time = new Date().getTime().toString();
        fetch(`/api/suggestion?q=${query}&l=${lang}&t=${time}`)
            .then((res) => res.json())
            .then((data: suggestionsResponse) => {
                const suggestions = data.suggestions;
                if (data.time < lastUpdate) return;
                setSuggetsion((_) => {
                    return suggestions.map((s: SuggestionType) => s.suggestion);
                });
                setLastUpdate(new Date().getTime());
            });
    }, [query]);
    return (
        <SuggestionBox>
            {suggestion.slice(0, 10).map((s: string) => {
                return <Suggestion key={s}>{s}</Suggestion>;
            })}
        </SuggestionBox>
    );
}
