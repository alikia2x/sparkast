import Image from "next/image";
import { useRecoilValue } from "recoil";
import { settingsState } from "./state/settings";
import validUrl from "valid-url";
import validateColor from "validate-color";

export default function(props: {
    isFocus: boolean;
    src: string;
    onClick: () => void;
}) {
    const settings = useRecoilValue(settingsState);
    if (validateColor(props.src)) {
        return (
            <div
                className="w-full h-full fixed object-cover inset-0 duration-200 z-0"
                style={{ backgroundColor: props.src }}
                onClick={props.onClick}
            ></div>
        );
    } else if (validUrl.isWebUri(props.src)) {
        return (
            <Image
                src={props.src}
                className={
                    "w-full h-full fixed object-cover inset-0 duration-200 z-0 " +
                    (props.isFocus
                        ? settings.bgBlur
                            ? "blur-lg scale-110"
                            : "brightness-50 scale-105"
                        : "")
                }
                alt="background"
                onClick={props.onClick}
                fill={true}
            />
        );
    }
}