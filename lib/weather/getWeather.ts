export async function getWeather(lat: number, lon: number) {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const cacheKey = `weather-cache-${lat.toFixed(2)}-${lon.toFixed(2)}-${timezone}`;
	const localData = localStorage.getItem(cacheKey);
	if (localData != null) {
		console.log("Using cache");
		const parsedLocalData = JSON.parse(localData);
		if (
			parsedLocalData["hourly"]["time"][0] != undefined &&
			new Date().getTime() - new Date(parsedLocalData["hourly"]["time"][0]).getTime() <
				86400 * 1000
		) {
			return parsedLocalData;
		} else {
			console.log("Cache expired");
			localStorage.removeItem(cacheKey);
		}
	}
	const url = `https://api.open-meteo.com/v1/cma?latitude=${lat.toString()}&longitude=${lon.toString()}&hourly=apparent_temperature,precipitation,weather_code&timezone=${encodeURIComponent(timezone)}&forecast_days=1`;
	const response = await fetch(url);
	const responseJson = await response.json();
	localStorage.setItem(cacheKey, JSON.stringify(responseJson));
	return responseJson;
}
