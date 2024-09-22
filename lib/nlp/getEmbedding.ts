type EmbeddingDict = { [key: number]: Float32Array };

function getEmbeddingLayer(buffer: Buffer): EmbeddingDict {
    const dict: EmbeddingDict = {};

    const entrySize = 514;
    const numEntries = buffer.length / entrySize;

    for (let i = 0; i < numEntries; i++) {
        const offset = i * entrySize;
        const key = buffer.readUInt16LE(offset);
        const floatArray = new Float32Array(128);

        for (let j = 0; j < 128; j++) {
            floatArray[j] = buffer.readFloatLE(offset + 2 + j * 4);
        }

        dict[key] = floatArray;
    }

    return dict;
}

function getEmbedding(tokenIds: number[], embeddingDict: EmbeddingDict, contextSize: number) {
  let result: number[] = [];
  for (let i = 0; i < contextSize; i++) {
    if (i < tokenIds.length) {
      const tokenId = tokenIds[i];
      result = result.concat(Array.from(embeddingDict[tokenId]))
    }
    else {
      result = result.concat(new Array(128).fill(0))
    }
  }
  return new Float32Array(result);
}

export {getEmbeddingLayer, getEmbedding};