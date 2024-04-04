import { useState } from "react";
import SuggestionBox from "./suggestionBox";
import Suggestion from "./suggestion";

export default function(){
    const [suggestion, setSuggetsion] = useState([]);
    return (
        <SuggestionBox>
            {
                suggestion.map((s: string) => {
                    return <Suggestion key={s}>{s}</Suggestion>
                })
            }
        </SuggestionBox>
    )
}