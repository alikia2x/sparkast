"use client";

import { atom, useRecoilState } from "recoil";
import Background from "./background";

export default function Homepage() {
    const bgFocus = atom({
        key: "isBackgroundFocus",
        default: false
    });

    const [isFocus, setFocus] = useRecoilState(bgFocus);
    return (
        <>
            <Background
                src="https://a2x.pub/sbcA1"
                isFocus={isFocus}
                onClick={() => setFocus(false)}
            />
        </>
    );
}
