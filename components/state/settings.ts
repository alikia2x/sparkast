import { atom, selector } from "recoil";

const settingsState = atom({
    key: "settings",
    default: {
        version: 1,
        elementBackdrop: true,
        bgBlur: true,
        timeShowSecond: false,
        currentSearchEngine: "google",
        searchEngines: {
            "google": "https://www.google.com/search?q=%s",
            "bing": "https://www.bing.com/search?q=%s",
            "baidu": "https://www.baidu.com/s?wd=%s",
            "duckduckgo": "https://duckduckgo.com/?q=%s",
            "yandex": "https://yandex.com/search/?text=%s",
        }
    }
});

export {
    settingsState,
}