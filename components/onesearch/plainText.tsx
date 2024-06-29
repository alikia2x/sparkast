export default function PlainText(props: { children: React.ReactNode; selected: boolean }) {
    if (props.selected) {
        return (
            <div
                className={`relative w-full h-auto leading-6 break-all py-[0.6rem] bg-zinc-300 dark:bg-zinc-700
                    px-5 z-10 cursor-pointer duration-100`}
            >
                {props.children}
            </div>
        );
    } else {
        return (
            <div
                className={`relative w-full h-auto leading-6 break-all py-[0.6rem] bg-zinc-100 hover:bg-zinc-300
                dark:bg-zinc-800 hover:dark:bg-zinc-700 px-5 z-10 cursor-pointer duration-100`}
            >
                {props.children}
            </div>
        );
    }
}
