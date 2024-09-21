export default function SuggestionBox(props: { children?: React.ReactNode }) {
	return (
		<div
			className={`relative bg-zinc-100 dark:bg-zinc-800 w-11/12 sm:w-[700px] h-auto max-h-[calc(100vh-20rem)] 
        overflow-y-auto left-1/2 translate-x-[-50%] top-72 z-20 rounded-md overflow-hidden duration-250 dark:text-white 
        ${props.children ? "opacity-100" : "opacity-0"}`}
		>
			{props.children}
		</div>
	);
}
