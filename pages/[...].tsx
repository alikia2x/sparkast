import { useTranslation } from "react-i18next";

export default function NotFound() {
	const { t } = useTranslation();
	return (
		<div className="relative w-screen h-screen flex justify-center items-center">
			<div className="flex items-center">
				<h1 className="text-7xl font-thin">404</h1>
				<div className="relative h-20 mx-4 w-[0.15rem] bg-black dark:bg-white"></div>
				<div className="flex flex-col">
					<div className="uppercase text-3xl font-light">{t("notfound.title")}</div>
					<div
						className="text-sm"
						dangerouslySetInnerHTML={{ __html: t("notfound.desc") }}
					></div>
				</div>
			</div>
		</div>
	);
}
