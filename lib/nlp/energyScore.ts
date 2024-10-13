function logsumexp(arr: number[]): number {
	const maxVal = Math.max(...arr);
	const sumExp = arr.reduce((sum, val) => sum + Math.exp(val - maxVal), 0);
	return Math.log(sumExp) + maxVal;
}

function minusEnergyScore(logits: number[]): number {
	return logsumexp(logits);
}

const energyScore = minusEnergyScore;

export default energyScore;
