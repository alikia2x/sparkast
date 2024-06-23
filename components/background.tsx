import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { bgFocusAtom } from "../lib/state/background";
import BackgroundContainer from "./backgroundContainer";

export default function Background() {
    const [isFocus, setFocus] = useAtom(bgFocusAtom);
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
        <div>
            {darkMode ? (
                <BackgroundContainer src="rgb(23,25,29)" isFocus={isFocus} onClick={() => setFocus(false)} darkMode={darkMode}/>
            ) : (
                <BackgroundContainer src="white" isFocus={isFocus} onClick={() => setFocus(false)} darkMode={darkMode}/>
            )}
        </div>
    );
}
