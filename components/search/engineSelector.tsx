"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { settingsState } from "../state/settings";
import { engineTranslation } from "./translatedEngineList";

export default function () {
    const t = useTranslations("Search");
    const settings: settings = useRecoilValue(settingsState);
    const items = settings.searchEngines;
    const currentEngine: string = settings.currentSearchEngine;
    const displayEngine = getName(currentEngine);
    const [selectedKeys, setSelectedKeys] = useState(new Set([currentEngine]) as any);
    const selectedValue = React.useMemo(() => Array.from(selectedKeys).join(", "), [selectedKeys]);
    const setSettings = useSetRecoilState(settingsState);

    function setEngine(engine: string) {
        setSettings((oldSettings) => {
            return {
                ...oldSettings,
                currentSearchEngine: engine
            };
        });
    }

    function getName(engineKey: string) {
        return engineTranslation.includes(engineKey) ? t(`engine.${engineKey}`) : engineKey;
    }

    useEffect(() => {
        if (selectedValue !== currentEngine) {
            setEngine(selectedValue);
        }
    }, [selectedValue]);

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div>
            {
            isClient &&
            (
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="bordered" className="capitalize">
                            {displayEngine}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label={t("engine-aria")}
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                    >
                        {Object.keys(items).map((item) => (
                            <DropdownItem key={item} suppressHydrationWarning>
                                {getName(item)}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            )}
        </div>
    );
}
