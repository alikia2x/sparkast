/**
 * Converts a base64 string to a hexadecimal string.
 *
 * @param {string} base64String - The base64 string to convert.
 * @return {string} The hexadecimal representation of the base64 string.
 */
export default function base64ToHex(base64String: string): string {
    const raw = atob(base64String);
    let result = "";
    for (let i = 0; i < raw.length; i++) {
        const hex = raw.charCodeAt(i).toString(16);
        result += hex.length === 2 ? hex : "0" + hex;
    }
    return result.toUpperCase();
}
