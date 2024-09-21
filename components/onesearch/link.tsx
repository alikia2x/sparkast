import { normalizeURL } from "lib/normalizeURL";
import { useNavigate } from "react-router";

interface LinkSuggestionProps {
	children: React.ReactNode;
	query: string;
	selected: boolean;
	inPage?: boolean;
}

export default function LinkSuggestion(props: LinkSuggestionProps) {
	const className = props.selected
		? `w-full h-10 leading-10 bg-zinc-300 dark:bg-zinc-700 px-5 z-10 cursor-pointer duration-100`
		: `w-full h-10 leading-10 bg-zinc-100 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-700 px-5 z-10 cursor-pointer duration-100`;
	const navigate = useNavigate();
	return (
		<div
			className={className}
			onClick={() => {
				if (props.inPage) {
					navigate(props.query);
				} else {
					window.open(normalizeURL(props.query));
				}
			}}
		>
			{props.children}
		</div>
	);
}
