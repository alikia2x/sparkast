import { HTMLAttributes, RefObject, useEffect, useRef, useState } from "react";
import { selectedOnChange } from "./selectorItem";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import React from "react";

export type selectionType = string;

interface PickerProps extends HTMLAttributes<HTMLDivElement> {
    selected: selectionType;
    selectionOnChange: selectedOnChange;
    displayContent: string;
    selectionItems: PickedItem;
}

export interface PickedItem {
    [key: string]: selectionType;
}

export default function Picker(props: PickerProps) {
    const itemListRef: RefObject<HTMLDivElement> = useRef(null);
    const buttonRef: RefObject<HTMLButtonElement> = useRef(null);
    const [displayList, setDisplayList] = useState(false);

    const updatePosition = () => {
        if (itemListRef.current == null || buttonRef.current == null) {
            return;
        }
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const listRect = itemListRef.current.getBoundingClientRect();
        // Align to center
        itemListRef.current.style.left =
            Math.max(
                Math.min(
                    buttonRect.x + buttonRect.width / 2 - listRect.width / 2,
                    window.screen.width - listRect.width - 16
                ),
                0
            ) + "px";
        if (window.screen.height - buttonRect.top < 192) {
            itemListRef.current.style.transformOrigin = "bottom center";
            itemListRef.current.style.top = buttonRect.top - listRect.height - 16 + "px";
        } else {
            itemListRef.current.style.top = buttonRect.y + buttonRect.height + 16 + "px";
        }
        if (listRect.top + listRect.height > window.screen.height - 16) {
            itemListRef.current.style.height = window.screen.height - listRect.top - 12 + "px";
        } else {
            itemListRef.current.style.height = "fit-content";
        }
    };

    useEffect(() => {
        updatePosition();
        const handleResize = () => {
            updatePosition();
        };

        window.addEventListener("resize", handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [itemListRef, buttonRef]);

    function toggleDisplay(targetState?: boolean) {
        function hideList() {
            if (itemListRef.current) {
                itemListRef.current.style.transitionDuration = "200ms";
                itemListRef.current.style.opacity = "0%";
            }
            setTimeout(() => {
                setDisplayList(false);
            }, 200);
        }
        function showList() {
            setDisplayList(true);
            setTimeout(() => {
                if (!itemListRef.current || !buttonRef.current) {
                    return;
                }
                updatePosition();
                if (window.screen.height - buttonRef.current.getBoundingClientRect().top < 128) {
                    itemListRef.current.style.transformOrigin = "bottom center";
                }
                itemListRef.current.style.transitionDuration = "100ms";
                itemListRef.current.style.opacity = "100%";
                updatePosition();
                const listRect = itemListRef.current.getBoundingClientRect();
                if (listRect.top < 8) {
                    itemListRef.current.style.height = window.screen.height - 8 + "px";
                    itemListRef.current.style.top = "8px";
                }
            }, 20);
        }
        if (targetState === true) {
            showList();
        } else if (targetState === false) {
            hideList();
        } else if (displayList === true) {
            hideList();
        } else {
            showList();
        }
    }

    const { displayContent, selectionOnChange, selectionItems, selected, ...rest } = props;
    return (
        <div {...rest}>
            <button
                className="relative border-2 border-gray-500 dark:border-gray-300 
                    rounded-xl dark:text-white px-4 py-2"
                ref={buttonRef}
                onClick={() => {
                    toggleDisplay();
                }}
            >
                {displayContent}
            </button>
            {displayList && (
                <PickerList
                    ref={itemListRef}
                    selected={selected}
                    selectionOnChange={selectionOnChange}
                    selectionItems={selectionItems}
                    toggleDisplay={toggleDisplay}
                />
            )}
        </div>
    );
}

interface PickerListProps {
    selected: selectionType;
    selectionOnChange: selectedOnChange;
    selectionItems: PickedItem;
    toggleDisplay: Function;
}

const PickerList = React.forwardRef<HTMLDivElement, PickerListProps>((props, ref) => {
    const { selected, selectionOnChange, selectionItems, toggleDisplay } = props;

    return createPortal(
        <div className="absolute w-screen h-screen" onClick={()=>{toggleDisplay(false)}}>
            <div
                ref={ref}
                className="overflow-y-auto fixed w-fit text-black dark:text-white opacity-0 duration-200 
            bg-zinc-50 shadow-lg border-1 border-zinc-200 dark:border-zinc-600 
            dark:bg-zinc-800 px-2 py-2 rounded-xl text-align-left"
                style={{ transformOrigin: "top center" }}
            >
                {Object.keys(selectionItems).map((key: string, index) => {
                    return (
                        <div
                            key={index}
                            className="relative py-2 w-full min-w-32 pl-2 cursor-pointer rounded-lg
                        hover:bg-zinc-200 dark:hover:bg-zinc-700 flex justify-between items-center"
                            onClick={() => {
                                selectionOnChange(key);
                                toggleDisplay(false);
                            }}
                        >
                            <span>{selectionItems[key]}</span>
                            <div className="relative w-16"></div>
                            {key === selected && (
                                <Icon className="relative right-2" icon="carbon:checkmark" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>,
        document.body
    );
});

PickerList.displayName = "PickerList";
