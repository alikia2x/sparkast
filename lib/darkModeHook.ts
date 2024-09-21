import { useState, useEffect } from "react";

// Custom React Hook for dark mode detect
export default function useDarkMode() {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const colorSchemeQueryList = window.matchMedia("(prefers-color-scheme: dark)");
		setDarkMode(colorSchemeQueryList.matches);

		const handleChange = () => {
			setDarkMode(colorSchemeQueryList.matches);
		};

		colorSchemeQueryList.addEventListener("change", handleChange);

		return () => {
			colorSchemeQueryList.removeEventListener("change", handleChange);
		};
	}, []);

	return darkMode;
}
