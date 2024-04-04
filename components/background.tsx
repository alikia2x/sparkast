"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { bgFocusState } from "./state/background";
import BackgroundContainer from "./backgroundContainer";

export default function () {
    const [isFocus, setFocus] = useRecoilState(bgFocusState);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const colorSchemeQueryList = window.matchMedia("(prefers-color-scheme: dark)");
        setDarkMode(colorSchemeQueryList.matches ? true : false);

        const handleChange = () => {
            setDarkMode(colorSchemeQueryList.matches ? true : false);
        };

        colorSchemeQueryList.addEventListener("change", handleChange);

        return () => {
            colorSchemeQueryList.removeEventListener("change", handleChange);
        };
    }, []);
    return (
        <div suppressHydrationWarning>
            {darkMode ? (
                <BackgroundContainer src="rgb(23,25,29)" isFocus={isFocus} onClick={() => setFocus(false)} darkMode={darkMode}/>
            ) : (
                <BackgroundContainer src="white" isFocus={isFocus} onClick={() => setFocus(false)} darkMode={darkMode}/>
            )}
        </div>
    );
}
