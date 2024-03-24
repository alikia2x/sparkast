"use client";

import { useContext } from "react";
import { SettingsContext } from "../contexts/settingsContext";
import Image from "next/image";


function Background(props: {
    isFocus: boolean;
    src: string;
    onClick: () => void;
}) {
    const settings = useContext(SettingsContext);
    const css = "w-full h-full fixed object-cover inset-0 duration-200 z-0";
    let focusCSS = settings.bgBlur
        ? "blur-lg scale-110"
        : "brightness-50 scale-105";
    let varCSS = props.isFocus ? focusCSS : "";
    return (
        <Image
            src={props.src}
            className={css + " " + varCSS}
            alt="background"
            onClick={props.onClick}
            fill={true}
        />
    );
}

export default Background;
