const options = {
	enableHighAccuracy: true,
	timeout: 10000,
	maximumAge: 3600
};

export function getLocationNative(callback: Function) {
	navigator.geolocation.getCurrentPosition(
		(pos: GeolocationPosition) => {
			callback(pos.coords);
		},
		(err: GeolocationPositionError) => {
			callback(err);
		},
		options
	);
}
