export default function(props: { children: React.ReactNode }) {
    return (
        <div className={`relative bg-slate-200 dark:bg-zinc-800 w-11/12 sm:w-[700px] h-auto left-1/2 
        translate-x-[-50%] top-72 z-20 rounded overflow-hidden duration-250 ${props.children ? "opacity-100" : "opacity-0"}`}>
            {props.children}
        </div>
    );
}
