import { useEffect, useState } from "react";
import SuggestionBox from "./suggestionBox";
import Suggestion from "./suggestion";
import { useRecoilValue } from "recoil";
import { queryState } from "@/components/state/query";
import { Suggestion as SuggestionType } from "search-engine-autocomplete";
import { useLocale, useTranslations } from "next-intl";
import { suggestionItem, suggestionsResponse } from "@/global";
import getSearchEngineName from "@/lib/getSearchEngineName";

export default function () {
    const [suggestion, setSuggetsion] = useState([] as suggestionItem[]);
    const [lastUpdate, setLastUpdate] = useState(0);
    const query = useRecoilValue(queryState);
    const engineName = getSearchEngineName();
    const lang = useLocale();
    const t = useTranslations("Search");

    useEffect(() => {
        const time = new Date().getTime().toString();
        fetch(`/api/suggestion?q=${query}&l=${lang}&t=${time}`)
            .then((res) => res.json())
            .then((data: suggestionsResponse) => {
            });
    }, [query, engineName]);

    useEffect(() => {
        setLastUpdate(new Date().getTime());
    }, [query]);

    return (
        <SuggestionBox>
        </SuggestionBox>
    );
}
