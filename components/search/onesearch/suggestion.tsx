export default function(props: { children: React.ReactNode }) {   
    return (
        <div className={`w-full h-10 leading-10 bg-slate-200 dark:bg-zinc-800 hover:bg-zinc-700 px-5 z-10 cursor-pointer duration-100`}>
            <p>{props.children}</p>
        </div>
    );
}