import { atom } from "recoil";

const selectedSuggestionState = atom({
    key: "selectedSuggestion",
    default: 0
});

export {
    selectedSuggestionState,
}