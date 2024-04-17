import { settingsType } from "@/global";
import isLocalStorageAvailable from "@/lib/isLocalStorageAvailable";
import { atom } from "recoil";

const defaultSettings: settingsType = {
    "version": 2,
    "elementBackdrop": true,
    "bgBlur": true,
    "timeShowSecond": false,
    "currentSearchEngine": "google",
    "searchInNewTab": true,
    "searchEngines": {
        "google": "https://www.google.com/search?q=%s",
        "bing": "https://www.bing.com/search?q=%s",
        "baidu": "https://www.baidu.com/s?wd=%s",
        "duckduckgo": "https://duckduckgo.com/?q=%s",
        "yandex": "https://yandex.com/search/?text=%s",
        "yahoo": "https://search.yahoo.com/search?p=%s",
        "ecosia": "https://www.ecosia.org/search?q=%s"
    }
};


const localStorageEffect =
    (key: string) =>
    ({ setSelf, onSet }: any) => {
        if (isLocalStorageAvailable()===false){
            return;
        }
        if (localStorage.getItem(key) === null) {
            localStorage.setItem(key, JSON.stringify(defaultSettings));
            return;
        }
        let settings =JSON.parse(JSON.stringify(defaultSettings));
        const savedSettings = localStorage.getItem(key)!;
        const parsedSettings = JSON.parse(savedSettings);
        
        Object.keys(settings).map((key) => {
           if (parsedSettings[key] !== undefined && key !== "version"){
                settings[key] = parsedSettings[key];
           }
        })

        setSelf(settings);
        localStorage.setItem(key, JSON.stringify(settings));

        onSet((newValue: settingsType) => {
            localStorage.setItem(key, JSON.stringify(newValue));
        });
    };

const settingsState = atom({
    key: "settings",
    default: defaultSettings,
    effects_UNSTABLE: [localStorageEffect("settings")]
});

export { settingsState };
