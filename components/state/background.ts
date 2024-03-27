import { atom, selector } from "recoil";

const bgFocusState = atom({
    key: "isBackgroundFocus",
    default: false
});

export {
    bgFocusState,
}