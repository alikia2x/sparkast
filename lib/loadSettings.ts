'use client';

import isLocalStorageAvailable from "./isLocalStorageAvailable";

const defaultSettings = {
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


export default function (setSettings: any) {
    if (isLocalStorageAvailable()===false){
        return;
    }
    if (localStorage.getItem("settings") === null) {
        localStorage.setItem("settings", JSON.stringify(defaultSettings));
        return;
    }
    const localSettings = JSON.parse(localStorage.getItem("settings") as string);
    setSettings(localSettings);
}
