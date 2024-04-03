import isLocalStorageAvailable from "@/lib/isLocalStorageAvailable";
import { atom } from "recoil";

const defaultSettings: settings = {
    version: 1,
    elementBackdrop: true,
    bgBlur: true,
    timeShowSecond: false,
    currentSearchEngine: "google",
    searchEngines: {
        google: "https://www.google.com/search?q=%s",
        bing: "https://www.bing.com/search?q=%s",
        baidu: "https://www.baidu.com/s?wd=%s",
        duckduckgo: "https://duckduckgo.com/?q=%s",
        yandex: "https://yandex.com/search/?text=%s",
        yahoo: "https://search.yahoo.com/search?p=%s",
        ecosia: "https://www.ecosia.org/search?q=%s"
    }
};

const localStorageEffect =
    (key: any) =>
    ({ setSelf, onSet }: any) => {
        if (isLocalStorageAvailable()===false){
            return;
        }
        const savedValue = localStorage.getItem(key);
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
        }

        onSet((newValue: settings) => {
            localStorage.setItem(key, JSON.stringify(newValue));
        });
    };

const settingsState = atom({
    key: "settings",
    default: defaultSettings,
    effects_UNSTABLE: [localStorageEffect("settings")]
});

export { settingsState };
