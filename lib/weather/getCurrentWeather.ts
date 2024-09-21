export function getClosestHourTimestamp(): string {
	const now = new Date();
	now.setMinutes(0, 0, 0); // 设置分钟、秒和毫秒为0

	// 获取本地时间的年份、月份、日期、小时
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始
	const day = String(now.getDate()).padStart(2, "0");
	const hour = String(now.getHours()).padStart(2, "0");

	// 拼接成所需的格式
	const localHourTimestamp = `${year}-${month}-${day}T${hour}:00`;

	return localHourTimestamp;
}

export function findClosestDateIndex(dates: string[]): number {
	const now = new Date();
	const nowTimestamp = now.getTime();

	let closestIndex = -1;
	let closestDiff = Infinity;

	for (let i = 0; i < dates.length; i++) {
		const date = new Date(dates[i]);
		const adjustedTimestamp = date.getTime();

		if (adjustedTimestamp <= nowTimestamp) {
			const diff = nowTimestamp - adjustedTimestamp;
			if (diff < closestDiff) {
				closestDiff = diff;
				closestIndex = i;
			}
		}
	}

	return closestIndex;
}
