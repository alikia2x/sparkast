import { suggestionItem } from "@/global";
import { atom } from "recoil";

const suggestionsState = atom({
    key: "oneSearchSuggestions",
    default: [] as suggestionItem[]
});

export {
    suggestionsState,
}