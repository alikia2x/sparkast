import { ReactNode } from "react";
import { selectionType } from "./selector";

export type selectedOnChange = (target: selectionType) => void;

export default function SelectionItem(props: {key: selectionType, children: ReactNode, onChange: selectedOnChange}){
    return (
        <div onClick={() => props.onChange(props.key)}>
            {props.children}
        </div>
    )
}