import { useEffect, useState } from "react";
import SuggestionBox from "./suggestionBox";
import Suggestion from "./suggestion";
import { useRecoilValue } from "recoil";
import { queryState } from "@/components/state/query";
import { Suggestion as SuggestionType } from "search-engine-autocomplete";
import { useLocale, useTranslations } from "next-intl";
import { suggestionsResponse } from "@/global";
import getSearchEngineName from "@/lib/getSearchEngineName";

export default function () {
    const [suggestion, setSuggetsion] = useState([] as string[]);
    const [lastUpdate, setLastUpdate] = useState(0);
    const query = useRecoilValue(queryState);
    const engineName = getSearchEngineName();
    const lang = useLocale();
    const t = useTranslations("Search");
    useEffect(() => {
        const searchHelperText = `<span class="text-zinc-500">${t("search-help-text", { engine: engineName })}</span>`;
        if (query !== "") setSuggetsion((_) => [`${query} &nbsp; ${searchHelperText}`]);
        else setSuggetsion((_) => []);
        const time = new Date().getTime().toString();
        fetch(`/api/suggestion?q=${query}&l=${lang}&t=${time}`)
            .then((res) => res.json())
            .then((data: suggestionsResponse) => {
                const suggestions = data.suggestions;
                if (data.time < lastUpdate) return;
                let result = suggestions.map((s: SuggestionType) => s.suggestion);
                result = result.filter(function (item, pos, self) {
                    return self.indexOf(item) == pos;
                });
                setSuggetsion((oldSuggestions) => {
                    return oldSuggestions.concat(result).filter(function (item, pos, self) {
                        return self.indexOf(item) == pos;
                    });
                });
                setLastUpdate(new Date().getTime());
            });
    }, [query, engineName]);
    return (
        <SuggestionBox>
            {suggestion.slice(0, 10).map((s: string) => {
                return <Suggestion key={s}>{s}</Suggestion>;
            })}
        </SuggestionBox>
    );
}
