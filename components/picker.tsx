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
        const listWidth = itemListRef.current.getBoundingClientRect().width;
        // Align to center
        itemListRef.current.style.left = buttonRect.x + buttonRect.width / 2 - listWidth / 2 + "px";
        itemListRef.current.style.top = buttonRect.y + buttonRect.height + 16 + "px";
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
                itemListRef.current.style.opacity = "0%";
                itemListRef.current.style.transform = "scaleX(.85) scaleY(.85)";
            }
            setTimeout(() => {
                setDisplayList(false);
            }, 200);
        }
        function showList() {
            setDisplayList(true);
            setTimeout(() => {
                updatePosition();
                if (itemListRef.current) {
                    itemListRef.current.style.opacity = "100%";
                    itemListRef.current.style.transform = "scaleX(1) scaleY(1)";
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
    const { selected, selectionOnChange, selectionItems } = props;

    return createPortal(
        <div
            ref={ref}
            className="absolute w-fit text-white opacity-0 duration-200 
            bg-gray-300 dark:bg-zinc-700 px-2 py-2 rounded-xl text-align-left scale-[.85]"
            style={{ transformOrigin: "top center" }}
        >
            {Object.keys(selectionItems).map((key: string, index) => {
                return (
                    <div
                        key={index}
                        className="relative py-2 w-full min-w-32 pl-2 cursor-pointer rounded-lg
                                hover:bg-zinc-400 dark:hover:bg-zinc-600 flex justify-between items-center"
                        onClick={() => {
                            selectionOnChange(key);
                            props.toggleDisplay();
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
        </div>,
        document.body
    );
});

PickerList.displayName = "PickerList";
