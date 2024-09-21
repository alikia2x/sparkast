export default function AboutLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen w-screen overflow-x-hidden bg-white dark:bg-[rgb(23,25,29)]">
			<main
				className="relative h-full w-full md:w-3/4 lg:w-1/2 left-0 md:left-[12.5%] lg:left-1/4
                    pt-12 px-3 md:px-0"
			>
				{children}
			</main>
		</div>
	);
}
