import { CLIENT_VERSION } from "../version";

export function sendError(error: Error) {
    fetch("/api/error", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: error.message,
            name: error.name,
            time: new Date().getTime()/1000,
            version: CLIENT_VERSION,
            ua: navigator.userAgent,
            cause: error.cause,
            stack: error.stack
        })
    })
}