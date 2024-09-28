function getEmbeddingLayer(buffer: ArrayBuffer): { [key: number]: Float32Array } {
	const dict: { [key: number]: Float32Array } = {};

	const entrySize = 192;
	const numEntries = buffer.byteLength / entrySize;
	const dataView = new DataView(buffer);

	for (let i = 0; i < numEntries; i++) {
		const offset = i * entrySize;
		const key = i;
		const floatArray = new Float32Array(96);

		for (let j = 0; j < 96; j++) {
			const halfFloat = dataView.getUint16(offset + j * 2, true);
			floatArray[j] = halfFloatToFloat32(halfFloat);
		}

		dict[key] = floatArray;
	}

	return dict;
}

function halfFloatToFloat32(halfFloat: number): number {
	const sign = (halfFloat & 0x8000) >> 15;
	const exponent = (halfFloat & 0x7c00) >> 10;
	const fraction = halfFloat & 0x03ff;

	if (exponent === 0) {
		if (fraction === 0) {
			// 零或负零
			return sign ? -0.0 : 0.0;
		} else {
			// 非规格化的数
			const f = fraction / 1024.0;
			const value = f * Math.pow(2, -14);
			return sign ? -value : value;
		}
	} else if (exponent === 0x1f) {
		if (fraction === 0) {
			// 无穷大或负无穷大
			return sign ? -Infinity : Infinity;
		} else {
			// NaN
			return NaN;
		}
	} else {
		// 规格化的数
		const f = fraction / 1024.0 + 1.0;
		const value = f * Math.pow(2, exponent - 15);
		return sign ? -value : value;
	}
}

function getEmbedding(
	tokenIds: number[],
	embeddingDict: { [key: number]: Float32Array },
	contextSize: number
): Float32Array {
	let result: number[] = [];
	for (let i = 0; i < contextSize; i++) {
		if (i < tokenIds.length) {
			const tokenId = tokenIds[i];
			result = result.concat(Array.from(embeddingDict[tokenId]));
		} else {
			result = result.concat(new Array(96).fill(0));
		}
	}
	return new Float32Array(result);
}

export { getEmbeddingLayer, getEmbedding };
