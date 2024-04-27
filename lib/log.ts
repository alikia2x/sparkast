import pino from "pino";

export const logger = pino({
    level: process.env.PINO_LOG_LEVEL || "info",
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        }
    }
},pino.destination(`./app.log`));