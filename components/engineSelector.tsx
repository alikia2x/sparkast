import React, { useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { settingsAtom } from "lib/state/settings";
import { engineTranslation } from "lib/onesearch/translatedEngineList";
import { settingsType } from "global";
import { useAtomValue, useSetAtom } from "jotai";

export default function EngineSelector(
    props: { className: string }
) {
    const { t } = useTranslation("Search");
    const settings: settingsType = useAtomValue(settingsAtom);
    const items = settings.searchEngines;
    const currentEngine: string = settings.currentSearchEngine;
    const displayEngine = getName(currentEngine);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedKeys, setSelectedKeys] = useState(new Set([currentEngine]) as any);
    const selectedValue = React.useMemo(() => Array.from(selectedKeys).join(", "), [selectedKeys]);
    const setSettings = useSetAtom(settingsAtom);

    

    function getName(engineKey: string) {
        return engineTranslation.includes(engineKey) ? t(`engine.${engineKey}`) : engineKey;
    }

    useEffect(() => {
        function setEngine(engine: string) {
            setSettings((oldSettings: settingsType) => {
                return {
                    ...oldSettings,
                    currentSearchEngine: engine
                };
            });
        }
        if (selectedValue !== currentEngine) {
            setEngine(selectedValue);
        }
    }, [currentEngine, selectedValue, setSettings]);

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className={props.className}>
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
                        variant="light"
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