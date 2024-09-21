import Background from "components/background";
import Time from "components/time";
import { useAtomValue, useSetAtom } from "jotai";
import Search from "components/search";
import { settingsAtom } from "lib/state/settings";
import { bgFocusAtom } from "lib/state/background";
import EngineSelector from "components/engineSelector";
import OneSearch from "components/onesearch/onesearch";

export default function Homepage() {
	const settings = useAtomValue(settingsAtom);
	const setBgFocus = useSetAtom(bgFocusAtom);

	return (
		<div className="h-screen w-screen overflow-x-hidden bg-white dark:bg-[rgb(23,25,29)]">
			<Background />

			<EngineSelector
				className="absolute top-20 lg:top-44 short:top-0 translate-x-[-50%] translate-y-[-0.2rem]  
            left-1/2 w-11/12 sm:w-[700px] text:black text-right 
            dark:text-white text-shadow-lg z-10"
			/>
			<Search onFocus={() => setBgFocus(true)} />
			<Time showSecond={settings.timeShowSecond} />
			<OneSearch />
		</div>
	);
}
