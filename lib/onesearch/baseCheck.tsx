export function validBase64(str: string) {
    return str.length % 4 == 0 && /^[A-Za-z0-9+/]+[=]{0,2}$/.test(str);
}