import { settingsType } from "global";
import { atomWithStorage } from 'jotai/utils'

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

const settingsAtom = atomWithStorage('settings', defaultSettings);

export { settingsAtom };
