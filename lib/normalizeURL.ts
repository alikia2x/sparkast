export function normalizeURL(input: string): string {
	try {
		// try to create a URL object
		const url = new URL(input, window.location.href);
		// if the URL is valid, return it
		return url.href;
	} catch (error) {
		// if the URL is invalid, try to add the protocol
		const withHTTP = "http://" + input;
		try {
			const urlWithHTTP = new URL(withHTTP);
			return urlWithHTTP.href;
		} catch (error) {
			// if the URL is still invalid, return the original input
			return input;
		}
	}
}
