import Background from "components/background";
import Time from "components/time";
import { useAtomValue, useSetAtom } from "jotai";
import Search from "components/search";
import { settingsAtom } from "lib/state/settings";
import { bgFocusAtom } from "lib/state/background";

export default function Homepage() {
    const settings = useAtomValue(settingsAtom);
    const setBgFocus = useSetAtom(bgFocusAtom);

    return (
        <div>
            <Background />
            <Search onFocus={() => setBgFocus(true)} />
            <Time showSecond={settings.timeShowSecond} />
        </div>
    );
}
