import { atom, selector } from "recoil";

const settingsState = atom({
    key: "settings",
    default: {
        version: 1,
        elementBackdrop: true,
        bgBlur: true
    }
});

export {
    settingsState,
}