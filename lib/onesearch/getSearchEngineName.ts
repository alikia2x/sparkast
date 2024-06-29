import { engineTranslation } from "lib/onesearch/translatedEngineList";
import { settingsAtom } from "lib/state/settings";
import { settingsType } from "global";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

export default function(){
    const settings: settingsType = useAtomValue(settingsAtom);
    const currentEngine = settings.currentSearchEngine;
    const displayEngine = getName(currentEngine);
    return displayEngine;
}

function getName(engineKey: string) {
    const { t } = useTranslation("Search");
    return engineTranslation.includes(engineKey) ? t(`engine.${engineKey}`) : engineKey;
}