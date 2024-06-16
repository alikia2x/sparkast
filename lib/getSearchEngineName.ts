import { engineTranslation } from "@/components/search/translatedEngineList";
import { settingsState } from "@/components/state/settings";
import { settingsType } from "@/global";
import { useTranslations } from "next-intl";
import { useRecoilValue } from "recoil";

export default function(){
    const settings: settingsType = useRecoilValue(settingsState);
    const currentEngine = settings.currentSearchEngine;
    const displayEngine = getName(currentEngine);
    return displayEngine;
}

function getName(engineKey: string) {
    const t = useTranslations("Search");
    return engineTranslation.includes(engineKey) ? t(`engine.${engineKey}`) : engineKey;
}