import { KeyboardEvent, useRef } from "react";
import { useAtom, useAtomValue } from "jotai";
import { settingsAtom } from "lib/state/settings";
import { queryAtom } from "lib/state/query";
import { selectedSuggestionAtom } from "lib/state/suggestionSelection";
import handleEnter from "lib/onesearch/handleEnter";
import { suggestionAtom } from "lib/state/suggestion";
import { useTranslation } from "react-i18next";
import { searchboxLastInputAtom } from "lib/state/searchboxLastInput";

export default function Search(props: { onFocus: () => void }) {
	const { t } = useTranslation();
	const settings = useAtomValue(settingsAtom);
	const [query, setQuery] = useAtom(queryAtom);
	const [selectedSuggestion, setSelected] = useAtom(selectedSuggestionAtom);
	const [_, setLastInput] = useAtom(searchboxLastInputAtom)
	const suggestions = useAtomValue(suggestionAtom);
	const searchBoxRef = useRef<HTMLInputElement>(null);

	const style = "default";

	function handleKeydown(e: KeyboardEvent) {
		if (e.key == "Enter") {
			e.preventDefault();
			handleEnter(selectedSuggestion, suggestions, query, settings, searchBoxRef);
			return;
		} else if (e.key == "ArrowUp") {
			e.preventDefault();
			const len = suggestions.length;
			const lastSelectedIndex = (selectedSuggestion - 1 + len) % len;
			const lastSuggeston = suggestions[lastSelectedIndex];
			setSelected(lastSelectedIndex);
			if (["QUERY", "NAVIGATION", "default"].includes(lastSuggeston.type)) {
				setQuery(lastSuggeston.suggestion);
			}
		} else if (e.key == "ArrowDown") {
			e.preventDefault();
			const len = suggestions.length;
			const nextSelectedIndex = (selectedSuggestion + 1 + len) % len;
			const nextSuggeston = suggestions[nextSelectedIndex];
			setSelected(nextSelectedIndex);
			if (["QUERY", "NAVIGATION", "default"].includes(nextSuggeston.type)) {
				setQuery(nextSuggeston.suggestion);
			}
		}
	}

	if (style === "default") {
		return (
			// 祖传样式，勿动
			<div className="absolute w-full top-[8.5rem] lg:top-56 short:top-24 z-1 left-1/2 translate-x-[-50%] ">
				<input
					className="absolute z-1 w-11/12 sm:w-[700px] h-10 rounded-lg left-1/2 translate-x-[-50%] 
                    text-center outline-none border-2 focus:border-2 duration-200 pr-2 shadow-md focus:shadow-none 
                    dark:shadow-zinc-800 dark:shadow-md bg-white dark:bg-[rgb(23,25,29)] 
                    dark:border-neutral-500 dark:focus:border-neutral-300 placeholder:text-slate-500 
                    dark:placeholder:text-slate-400 text-slate-900 dark:text-white"
					id="searchBox"
					type="text"
					placeholder={t("search.placeholder")}
					onFocus={props.onFocus}
					onKeyDown={handleKeydown}
					onChange={(e) => {
						setLastInput(new Date().getTime());
						setQuery(() => e.target.value);
					}}
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
					placeholder="placeholder"
					onFocus={props.onFocus}
					ref={searchBoxRef}
				/>
			</div>
		);
	}
}
