/**
 * A description of the entire function.
 *
 * @param {string} hexString - The input hexadecimal string to normalize.
 * @return {string} The normalized hexadecimal string.
 */
export default function normalizeHex(hexString: string): string {
    const chunkSize = 4;
    const chunks: string[] = [];
    
    for (let i = 0; i < hexString.length; i += chunkSize) {
        chunks.push(hexString.substr(i, chunkSize));
    }
    
    return chunks.join(' ');
}
