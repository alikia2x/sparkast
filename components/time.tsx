'use client';

import React, {useState, useEffect} from "react";

export default function Time(props: {
    showSecond: boolean;
}){
    const [currentTime, setCurrentTime] = useState(new Date());

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

        if (props.showSecond) {
            return `${hours}:${minutes}:${seconds}`;
        } else {
            return `${hours}:${minutes}`;
        }
    };

    return (
        <div
            className="absolute top-20 lg:top-[9.5rem] short:top-0 translate-x-[-50%] left-1/2 duration-200 
            text-white text-[40px] text-center text-shadow-lg z-10"
            style={{textShadow: "0px 0px 5px rgba(30,30,30,0.5)"}}
        >
            {formatTime()}
        </div>
    );
};
