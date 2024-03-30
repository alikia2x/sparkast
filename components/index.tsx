'use client';

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Background from "./background";
import Search from "./search/search";
import { bgFocusState } from "./state/background";
import Time from "./time";

export default function Homepage() {
    const [isFocus, setFocus] = useRecoilState(bgFocusState);
    const [colorScheme, setColorScheme] = useState('');

    useEffect(() => {
        const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        setColorScheme(colorSchemeQueryList.matches ? 'dark' : 'light');

        const handleChange = () => {
            setColorScheme(colorSchemeQueryList.matches ? 'dark' : 'light');
        };

        colorSchemeQueryList.addListener(handleChange);

        return () => {
            colorSchemeQueryList.removeListener(handleChange);
        };
    }, []);

    return (
        <div className="h-full fixed overflow-hidden w-full bg-black">
            <Time />
            {colorScheme === 'dark' && (
                <Background src="rgb(23,25,29)" isFocus={isFocus} onClick={() => setFocus(false)} />
            )}
            {colorScheme === 'light' && (
                <Background src="white" isFocus={isFocus} onClick={() => setFocus(false)} />
            )}
            <Search onFocus={() => setFocus(true)} />
        </div>
    );
}
