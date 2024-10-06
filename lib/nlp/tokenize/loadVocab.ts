export async function loadVocab(): Promise<any> {
	try {
		// Fetch the vocab.json file
		const response = await fetch("/model/vocab.json");

		// Check if the request was successful
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// Parse the JSON from the response
		const data = await response.json();

		// Return the parsed JSON
		return data;
	} catch (error) {
		// Handle any errors that occurred during the fetch or parsing process
		console.error("Error loading vocab.json:", error);
		throw error;
	}
}
