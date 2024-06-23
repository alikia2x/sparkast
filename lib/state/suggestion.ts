import { suggestionItem } from "global";
import { atom } from "jotai";

const suggestionAtom = atom([] as suggestionItem[]);

export { suggestionAtom };
