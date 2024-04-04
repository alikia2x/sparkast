"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { bgFocusState } from "./state/background";

import dynamic from "next/dynamic";

const Background = dynamic(() => import("./backgroundContainer"), { ssr: false });

export default function () {
    const [isFocus, setFocus] = useRecoilState(bgFocusState);
    const [colorScheme, setColorScheme] = useState("light");

    useEffect(() => {
        const colorSchemeQueryList = window.matchMedia("(prefers-color-scheme: dark)");
        setColorScheme(colorSchemeQueryList.matches ? "dark" : "light");

        const handleChange = () => {
            setColorScheme(colorSchemeQueryList.matches ? "dark" : "light");
        };

        colorSchemeQueryList.addEventListener("change", handleChange);

        return () => {
            colorSchemeQueryList.removeEventListener("change", handleChange);
        };
    }, []);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <div suppressHydrationWarning>
            {isClient && (
                <div>
                    {colorScheme === "dark" && (
                        <Background src="rgb(23,25,29)" isFocus={isFocus} onClick={() => setFocus(false)} />
                    )}
                    {colorScheme === "light" && (
                        <Background src="white" isFocus={isFocus} onClick={() => setFocus(false)} />
                    )}
                </div>
            )}
        </div>
    );
}
