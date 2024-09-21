"use client";

import { useState, useEffect } from "react";

export default function Time(props: { showSecond: boolean }) {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 150);

		return () => {
			clearInterval(timer);
		};
	}, []);

	const formatTime = () => {
		const hours = currentTime.getHours().toString().padStart(2, "0");
		const minutes = currentTime.getMinutes().toString().padStart(2, "0");
		const seconds = currentTime.getSeconds().toString().padStart(2, "0");

		if (props.showSecond) {
			return `${hours}:${minutes}:${seconds}`;
		} else {
			return `${hours}:${minutes}`;
		}
	};

	return (
		<div
			className="absolute top-20 lg:top-44 short:top-0 translate-x-[-50%] 
            left-1/2 w-11/12 sm:w-[700px] text:black 
            dark:text-white text-3xl text-left text-shadow-lg"
		>
			{formatTime()}{" "}
			<span className="text-lg leading-9 relative">
				{new Intl.DateTimeFormat(navigator.language, {
					year: "numeric",
					month: "short",
					day: "numeric"
				}).format(currentTime)}
			</span>
		</div>
	);
}
