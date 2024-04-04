"use client";

import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { settingsState } from "./state/settings";
import Search from "./search/search";
import { bgFocusState } from "./state/background";
import Time from "./time";
import loadSettings from "@/lib/loadSettings";
import EngineSelector from "./search/engineSelector";
import Onesearch from "./search/onesearch/onesearch";
import Background from "./background";


export default function Homepage() {
    const [settings, setSettings] = useRecoilState(settingsState);
    const setFocus = useSetRecoilState(bgFocusState);

    useEffect(() => {
        loadSettings(setSettings);
    }, [setSettings]);


    return (
        <div className="h-full fixed overflow-hidden w-full bg-black">
            <Time showSecond={settings.timeShowSecond} />
            <EngineSelector className="absolute top-20 lg:top-44 short:top-0 translate-x-[-50%] translate-y-[-0.2rem]
            left-1/2 w-11/12 sm:w-[700px] text:black text-right
            dark:text-white text-3xl text-shadow-lg z-10"/>
            <Background />
            <Search onFocus={() => setFocus(true)} />
            <Onesearch />
            <p className="z-20 relative text-white text-2xl">FUCK YOU SSR</p>
        </div>
    );
}
