import { suggestionItem } from "global";
import { findClosestDateIndex } from "lib/weather/getCurrentWeather";
import { getLocationNative } from "lib/weather/getLocation";
import { getWeather } from "lib/weather/getWeather";
import { WMOCodeTable } from "lib/weather/wmocode";

type UpdateSuggestionFunction = (data: suggestionItem[]) => void;

export function handleNLUResult(result: any, updateSuggestion: UpdateSuggestionFunction){
    if (result.intent == "weather.summary") {
        getLocationNative((data: GeolocationCoordinates | GeolocationPositionError) => {
            console.log(data);
            if (data instanceof GeolocationCoordinates) {
                getWeather(data.latitude, data.longitude).then((weather) => {
                    console.log(weather["hourly"]);
                    let hourIndex = findClosestDateIndex(
                        weather["hourly"]["time"],
                        weather["utc_offset_seconds"]
                    );
                    let temp = weather["hourly"]["apparent_temperature"][hourIndex];
                    let weatherCode = weather["hourly"]["weather_code"][hourIndex];
                    console.log(temp, weatherCode, hourIndex);
                    updateSuggestion([
                        {
                            type: "text",
                            suggestion: `Weather: ${temp}${weather["hourly_units"]["apparent_temperature"]}, ${WMOCodeTable[weatherCode]["day"].description}`,
                            relevance: 3000 * result.score
                        }
                    ]);
                });
            }
        });
    } else if (result.intent !== "None") {
        updateSuggestion([
            {
                type: "text",
                suggestion: result.intent,
                relevance: 2200 * result.score
            }
        ]);
    }
}