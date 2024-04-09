import { useEffect, useState } from "react";
import SuggestionBox from "./suggestionBox";
import Suggestion from "./suggestion";
import { useRecoilValue } from "recoil";
import { queryState } from "@/components/state/query";

export default function () {
    const [suggestion, setSuggetsion] = useState([]);
    const query = useRecoilValue(queryState);
    useEffect(() => {
        fetch(`/api/suggestion?q=${query}`)
            .then((res) => res.json())
            .then((data) => {
                setSuggetsion(data);
            });
    }, [query]);
    return (
        <SuggestionBox>
            {suggestion.map((s: string) => {
                return <Suggestion key={s}>{s}</Suggestion>;
            })}
        </SuggestionBox>
    );
}
