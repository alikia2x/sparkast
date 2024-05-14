"use client";

import Switcher from "@/components/switcher";
import Notice from "@/components/tools/notice";
import base64ToHex from "@/lib/base64ToHex";
import copyToClipboard from "@/lib/copy";
import normalizeHex from "@/lib/normalizeHex";
import { validBase64 } from "@/lib/onesearch/baseCheck";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { utoa, atou } from "unicode-encode";

export default function Base64() {
    const t = useTranslations("tools");
    const [mode, setMode] = useState("Encode");
    const [message, setMessage] = useState("");
    const [messageResult, setMessageResult] = useState("");
    const [isHex, setHex] = useState(false);
    const [info, setInfo] = useState("");
    const [type, setType] = useState("");
    useEffect(() => {
        setType("");
        setInfo("");
        setHex(false);
        if (mode == "Encode") {
            setMessageResult(utoa(message));
        } else {
            if (validBase64(message)) {
                try {
                    setMessageResult(atou(message));
                } catch (e) {
                    setMessageResult(normalizeHex(base64ToHex(message)));
                    setHex(true);
                    setType("info");
                    setInfo("Showing HEX result.");
                }
            } else if (message.trim() !== "") {
                setMessageResult("");
                setType("warning");
                setInfo("Invalid Base64.");
            } else {
                setMessageResult("");
            }
        }
    }, [mode, message]);
    return (
        <div>
            <h1 className="text-3xl font-semibold">{t("base64.title")}</h1>
            <Switcher items={["Encode", "Decode"]} selected={mode} setSelected={setMode} class="mt-4" />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-80 mt-4 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 resize-none outline-none duration-200 transition-colors-opacity border-2 border-transparent focus:border-zinc-600 dark:focus:border-zinc-300"
            />
            <div className="w-full h-12 mt-4">
                <span className="w-fit text-2xl font-bold leading-10">Result:</span>
                <button
                    onClick={() => {
                        copyToClipboard(messageResult);
                        setType("info");
                        setInfo("Copied");
                        setTimeout(() => {
                            setInfo("");
                            setType("");
                        }, 3000);
                    }}
                    className="absolute right-0 w-fit h-10 rounded-md leading-10 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-300 hover:dark:bg-zinc-700 px-5 z-10 cursor-pointer duration-300"
                >
                    Copy
                </button>
            </div>
            <div
                className={`empty:py-0 mt-6 w-full h-fit rounded-md leading-10 bg-zinc-100 dark:bg-zinc-800 py-2 px-5 z-10 cursor-pointer duration-100 break-all ${
                    isHex ? "font-mono" : ""
                }`}
            >
                {messageResult}
            </div>
            <Notice type={type} info={info} class="mt-4" />
        </div>
    );
}
