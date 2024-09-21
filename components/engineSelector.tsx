import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { settingsAtom } from "lib/state/settings";
import { engineTranslation } from "lib/onesearch/translatedEngineList";
import { settingsType } from "global";
import { useAtomValue, useSetAtom } from "jotai";
import Picker, { PickedItem } from "./picker";

export default function EngineSelector(props: { className: string }) {
	const { t } = useTranslation();
	const settings: settingsType = useAtomValue(settingsAtom);
	const engines = settings.searchEngines;
	const currentEngine: string = settings.currentSearchEngine;
	const [selected, setSelected] = useState(currentEngine);
	const setSettings = useSetAtom(settingsAtom);
	let engineList: PickedItem = {};
	for (const engineKey of Object.keys(engines)) {
		engineList[engineKey] = getName(engineKey);
	}

	function getName(engineKey: string) {
		return engineTranslation.includes(engineKey) ? t(`search.engine.${engineKey}`) : engineKey;
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
		if (selected !== currentEngine) {
			setEngine(selected);
		}
	}, [currentEngine, selected, setSettings]);

	return (
		<Picker
			selectionItems={engineList}
			selected={selected}
			selectionOnChange={(selected) => {
				setSelected(selected);
			}}
			displayContent={getName(selected)}
			className={props.className}
		/>
	);
}
