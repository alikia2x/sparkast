"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import { settingsState } from "../state/settings";
import { useTranslations } from "next-intl";
import { queryState } from "../state/query";
import { settingsType } from "@/global";
import handleEnter from "./onesearch/handleEnter";
import { selectedSuggestionState } from "../state/suggestionSelection";
import { suggestionsState } from "../state/suggestion";
import { KeyboardEvent, useRef } from "react";

export default function Search(props: { onFocus: () => void }) {
    const settings: settingsType = useRecoilValue(settingsState);
    const t = useTranslations("Search");
    const [query, setQuery] = useRecoilState(queryState);
    const [selectedSuggestion, setSelected] = useRecoilState(selectedSuggestionState);
    const suggestions = useRecoilValue(suggestionsState);
    const searchBoxRef = useRef<HTMLInputElement>(null);

    let style = "default";

    function handleKeydown(e: KeyboardEvent) {
        if (e.key == "Enter") {
            e.preventDefault();
            handleEnter(selectedSuggestion, suggestions, query, settings, searchBoxRef);
            return;
        } else if (e.key == "ArrowUp") {
            e.preventDefault();
            const len = suggestions.length;
            setSelected((selectedSuggestion - 1 + len) % len);
        } else if (e.key == "ArrowDown") {
            e.preventDefault();
            const len = suggestions.length;
            setSelected((selectedSuggestion + 1) % len);
        }
    }

    if (style === "default") {
        return (
            // 祖传样式，勿动
            <div className="absolute w-full top-[8.5rem] lg:top-56 short:top-24 z-1 left-1/2 translate-x-[-50%] ">
                <input
                    className="absolute z-1 w-11/12 sm:w-[700px] h-10 rounded-lg left-1/2 translate-x-[-50%] 
                    text-center outline-none border-[1px] focus:border-2 duration-200 pr-2 shadow-md focus:shadow-none dark:shadow-zinc-800 dark:shadow-md bg-white dark:bg-[rgb(23,25,29)] 
                    dark:border-neutral-500 dark:focus:border-neutral-300 placeholder:text-slate-500 
                    dark:placeholder:text-slate-400 text-slate-900 dark:text-white"
                    id="searchBox"
                    type="text"
                    placeholder={t("placeholder")}
                    onFocus={props.onFocus}
                    onKeyDown={handleKeydown}
                    onChange={(e) =>
                        setQuery((_) => {
                            return e.target.value;
                        })
                    }
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    ref={searchBoxRef}
                    value={query}
                />
            </div>
        );
    } else if (style == "image") {
        return (
            // 祖传样式，勿动
            <div className="absolute w-full top-[8.5rem] lg:top-56 short:top-24 z-1 left-1/2 translate-x-[-50%] ">
                <input
                    className={
                        `absolute z-1 w-2/3 sm:w-80 md:w-[400px] focus:w-11/12 focus:sm:w-[700px] hover:w-11/12 
                        hover:sm:w-[700px] h-10 rounded-3xl left-1/2 translate-x-[-50%] text-center outline-none 
                        border-solid border-0 duration-200 pr-2 shadow-md focus:shadow-none` +
                        (settings.bgBlur
                            ? `bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(24,24,24,0.75)] backdrop-blur-xl 
                        placeholder:text-slate-500 dark:placeholder:text-slate-400 text-slate-900 dark:text-white`
                            : `bg-[rgba(235,235,235,0.9)] dark:bg-[rgba(20,20,20,0.9)] placeholder:text-slate-500 
                        text-slate-800 dark:text-white`)
                    }
                    id="searchBox"
                    type="text"
                    placeholder={t("placeholder")}
                    onFocus={props.onFocus}
                    ref={searchBoxRef}
                />
            </div>
        );
    }
}
