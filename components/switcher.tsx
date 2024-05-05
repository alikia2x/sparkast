'use client';

import React, { useState, useEffect, useRef } from "react";

export default function Switcher(props: { items: string[]; selected: string, setSelected: Function, class?: string }) {
    const selectedRef = useRef(null);
    const [selectedCoordinate, setSelectedCoordinate] = useState(0);
    const [selectedWidth, setSelectedWidth] = useState(0);
    useEffect(() => {
        if (selectedRef.current){
            setSelectedCoordinate((selectedRef.current as HTMLElement)?.offsetLeft);
            setSelectedWidth((selectedRef.current as HTMLElement)?.getBoundingClientRect().width);
        }
    }, [props.selected]);
    
    return (
        <div className={`relative w-fit h-12 px-1 flex rounded-lg bg-zinc-100 dark:bg-zinc-800 z-0 ${props.class}`}>
            {props.items.map((item, index) => (
                <div
                    key={index}
                    className="relative mt-[0.375rem] rounded-md w-fit h-9 leading-9 px-4 mx-1 z-20 cursor-pointer duration-100"
                    ref={item == props.selected ? selectedRef : null}
                    onClick={() => props.setSelected(item)}
                >
                    {item}
                </div>
            ))}
            <div className="absolute mt-[0.375rem] rounded-md h-9 bg-zinc-300 dark:bg-zinc-600 z-10 duration-250 ease-[cubic-bezier(.15,.16,.2,1.2)]" style={{ left: selectedCoordinate, width: selectedWidth }}></div>
        </div>
    );
}
