"use client";

import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { settingsState } from "./state/settings";
import { useFormatter } from "next-intl";

export default function Time() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const settings = useRecoilValue(settingsState);
    const format = useFormatter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 150);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formatTime = () => {
        const hours = currentTime.getHours().toString().padStart(2, "0");
        const minutes = currentTime.getMinutes().toString().padStart(2, "0");
        const seconds = currentTime.getSeconds().toString().padStart(2, "0");

        if (settings.timeShowSecond) {
            return `${hours}:${minutes}:${seconds}`;
        } else {
            return `${hours}:${minutes}`;
        }
    };

    return (
        <div
            className="absolute top-20 lg:top-44 short:top-0 translate-x-[-50%] 
            left-1/2 w-11/12 sm:w-[700px] text:black
            dark:text-white text-3xl text-left text-shadow-lg z-10"
        >
            {formatTime()}{" "}
            <span className="text-lg leading-9 relative">
                {format.dateTime(currentTime, {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                })}
            </span>
        </div>
    );
}
