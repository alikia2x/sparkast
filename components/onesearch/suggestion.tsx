export default function Suggestion(props: { children: React.ReactNode }) {   
    return (
        <div dangerouslySetInnerHTML={{ __html: `<p>${props.children}</p>` as string }} className={`relative w-full h-10 leading-10 bg-zinc-100 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-700 px-5 z-10 cursor-pointer duration-100`}>
        </div>
    );
}