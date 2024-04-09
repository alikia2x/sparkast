import { atom } from "recoil";

const queryState = atom({
    key: "searchQuery",
    default: ""
});

export {
    queryState,
}