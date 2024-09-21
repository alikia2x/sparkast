import * as pjson from "package.json";

export default function getVersion(){
    return pjson.version;
}

export const clientNLUVersion = 2;
export const apiVersion = 1;