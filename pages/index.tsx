import Background from "components/background";
import Time from "components/time";
import { useAtomValue, useSetAtom } from "jotai";
import Search from "components/search";
import { settingsAtom } from "lib/state/settings";
import { bgFocusAtom } from "lib/state/background";
import EngineSelector from "components/engineSelector";
import OneSearch from "components/onesearch/onesearch";
import Picker from "components/selector";

export default function Homepage() {
    const settings = useAtomValue(settingsAtom);
    const setBgFocus = useSetAtom(bgFocusAtom);

    return (
        <div className="h-full fixed overflow-hidden w-full bg-black">
            <Background />
            <EngineSelector
                className="absolute top-20 lg:top-44 short:top-0 translate-x-[-50%] translate-y-[-0.2rem] 
            left-1/2 w-11/12 sm:w-[700px] text:black text-right 
            dark:text-white text-3xl text-shadow-lg z-10"
            />
            <Search onFocus={() => setBgFocus(true)} />
            <Time showSecond={settings.timeShowSecond} />
            <OneSearch />
            <Picker
                selectionItems={{ "1": "Item1", "2": "Item2" }}
                selected="2"
                selectionOnChange={() => {}}
                displayContent="Item1"
                className="absolute w-fit h-8 top-20 lg:top-44 short:top-0 -translate-x-1/2 -translate-y-1 left-1/2 z-20"
            />
        </div>
    );
}
