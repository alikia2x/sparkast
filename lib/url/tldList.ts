import TLDtxt from "./tlds.txt?raw";

export function getTLD() {
	return TLDtxt.split("\r\n").filter((line) => line[0] !== "#");
}
