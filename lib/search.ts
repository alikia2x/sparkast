export default function (query: string, engine: string, newTab: boolean = true) {
	if (newTab) window.open(engine.replace("%s", query));
	else window.location.href = engine.replace("%s", query);
}
