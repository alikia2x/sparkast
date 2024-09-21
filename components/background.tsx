import { useAtom } from "jotai";
import { bgFocusAtom } from "../lib/state/background";
import BackgroundContainer from "./backgroundContainer";
import useDarkMode from "lib/darkModeHook";

export default function Background() {
    const [isFocus, setFocus] = useAtom(bgFocusAtom);
    
    const darkMode = useDarkMode();

    return (
        <div>
            {darkMode ? (
                <BackgroundContainer src="rgb(23,25,29)" isFocus={isFocus} onClick={() => setFocus(false)} darkMode={darkMode}/>
            ) : (
                <BackgroundContainer src="white" isFocus={isFocus} onClick={() => setFocus(false)} darkMode={darkMode}/>
            )}
        </div>
    );
}
