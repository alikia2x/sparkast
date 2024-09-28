export default function bytesToUnicode(): { [key: number]: string } {
    const bs: number[] = [
        ...Array.from({ length: 126 - 33 + 1 }, (_, i) => 33 + i), // range(ord("!"), ord("~") + 1)
        ...Array.from({ length: 172 - 161 + 1 }, (_, i) => 161 + i), // range(ord("¡"), ord("¬") + 1)
        ...Array.from({ length: 255 - 174 + 1 }, (_, i) => 174 + i)  // range(ord("®"), ord("ÿ") + 1)
    ];

    const cs: number[] = [...bs];
    let n = 0;

    for (let b = 0; b < 256; b++) {
        if (!bs.includes(b)) {
            bs.push(b);
            cs.push(256 + n);
            n++;
        }
    }

    const csChars: string[] = cs.map(n => String.fromCharCode(n));
    return Object.fromEntries(bs.map((b, i) => [b, csChars[i]]));
}