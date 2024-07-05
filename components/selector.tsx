import { HTMLAttributes, ReactNode, RefObject, useEffect, useRef } from "react";
import { selectedOnChange } from "./selectorItem";
import { createPortal } from "react-dom";

export type selectionType = string | number | boolean;

interface PickerPropsChildrenStyle extends HTMLAttributes<HTMLDivElement> {
    selected: selectionType;
    selectionOnChange: selectedOnChange;
    displayContent: string;
    children: ReactNode;
}

interface PickerPropsParamStyle extends HTMLAttributes<HTMLDivElement> {
    selected: selectionType;
    selectionOnChange: selectedOnChange;
    displayContent: string;
    selectionItems: PickedItem;
}

interface PickedItem {
    [key: string]: selectionType;
}

export default function Picker(props: PickerPropsChildrenStyle | PickerPropsParamStyle) {
    const itemListRef: RefObject<HTMLDivElement> = useRef(null);
    const buttonRef: RefObject<HTMLButtonElement> = useRef(null);

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

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [itemListRef, buttonRef]);

    if ("selectionItems" in props) {
        const { selectionItems, displayContent, selectionOnChange, ...rest } = props;
        return (
            <div {...rest}>
                <button
                    className="relative border-2 border-gray-500 dark:border-gray-300 rounded-xl dark:text-white 
                    px-4 py-2"
                    ref={buttonRef}
                >
                    {displayContent}
                </button>
                {createPortal(
                    <div ref={itemListRef} className="absolute w-fit text-white">
                        {Object.keys(selectionItems).map((key: string, index) => {
                            return <div key={index}>{selectionItems[key]}</div>;
                        })}
                    </div>,
                    document.body
                )}
            </div>
        );
    } else {
        return (
            <div {...props}>
                <button className="relative" ref={buttonRef}>
                    {props.displayContent}
                </button>
                {createPortal(<div ref={itemListRef}>{props.children}</div>, document.body)}
            </div>
        );
    }
}
