import { normalizeURL } from "@/lib/normalizeURL";

export default function (props: { children: React.ReactNode; query: string; selected: boolean }) {
    if (props.selected) {
        return (
            <div
                className={`w-full h-10 leading-10 bg-zinc-300 dark:bg-zinc-700 
                    px-5 z-10 cursor-pointer duration-100`}
                onClick={() => {
                    window.open(normalizeURL(props.query));
                }}
            >
                {props.children}
            </div>
        );
    }
    else {
        return (
            <div
                className={`w-full h-10 leading-10 bg-zinc-100 hover:bg-zinc-300 
                dark:bg-zinc-800 hover:dark:bg-zinc-700 px-5 z-10 cursor-pointer duration-100`}
                onClick={() => {
                    window.open(normalizeURL(props.query));
                }}
            >
                {props.children}
            </div>
        );
    }
}
