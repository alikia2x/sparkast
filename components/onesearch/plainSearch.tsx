import { useAtomValue } from "jotai";
import search from "lib/search";
import { settingsAtom } from "lib/state/settings";

export default function PlainSearch(props: { children: React.ReactNode; query: string; selected: boolean }) {
    const settings = useAtomValue(settingsAtom);
    const engine = settings.searchEngines[settings.currentSearchEngine];
    const newTab = settings.searchInNewTab;
    if (props.selected) {
        return (
            <div
                className={`relative w-full h-10 leading-10 bg-zinc-300 dark:bg-zinc-700 
                    px-5 z-10 cursor-pointer duration-100 truncate`}
                onClick={() => {
                    search(props.query, engine, newTab);
                }}
            >
                {props.children}
            </div>
        );
    }
    else {
        return (
            <div
                className={`relative w-full h-10 leading-10 bg-zinc-100 hover:bg-zinc-300 
                dark:bg-zinc-800 hover:dark:bg-zinc-700 px-5 z-10 cursor-pointer duration-100 truncate`}
                onClick={() => {
                    search(props.query, engine, newTab);
                }}
            >
                {props.children}
            </div>
        );
    }
}
