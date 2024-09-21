import chalk from "chalk";
import express from "express";
import ViteExpress from "vite-express";
import pjson from "./package.json";
import { networkInterfaces } from "os";
import cac from "cac";
import { configureBackendRoutes } from "./backend/route";


async function helloMessage() {
    const { base } = await ViteExpress.getViteConfig();
    const timeCost = new Date().getTime() - start.getTime();
    console.log("");
    console.log(
        "  ",
        chalk.redBright("SparkHome"),
        chalk.redBright("v" + pjson.version),
        chalk.whiteBright(" ready in"),
        `${Math.round(timeCost)} ms`
    );
    console.log("");
    console.log("  ", chalk.redBright("➜  "), "Local:\t", chalk.cyan(`http://${host}:${port}${base}`));
    if (host !== "localhost") {
        for (const ip of ips) {
            console.log("  ", chalk.redBright("➜  "), "Network:\t", chalk.cyan(`http://${ip}:${port}${base}`));
        }
    }
    console.log("  ", chalk.red("➜  "), chalk.whiteBright("press"), "h + enter", chalk.whiteBright("to show help"))
}

async function handleInput() {
    for await (const line of console) {
        switch (line) {
            case "h":
                console.log("  Shortcuts");
                console.log("  ", chalk.whiteBright("press"), "c + enter ", chalk.whiteBright("to clear console"));
                console.log("  ", chalk.whiteBright("press"), "q + enter ", chalk.whiteBright("to quit"));
                break;
            case "c":
                console.clear();
                break;
            case "q":
                server.on("vite:close", ()=>{});
                server.close();
                return;
            default:
                break;
        }
    }
}

const start = new Date();
const cli = cac();
const nets = networkInterfaces();
const ips: string[] = [];
for (const name of Object.keys(nets)) {
    if (nets[name] === undefined) {
        continue;
    }
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
        if (net.family === familyV4Value && !net.internal) {
            ips.push(net.address);
        }
    }
}

const app = express();
const port = 3000;
let host = "localhost";

cli.option("--host [host]", "Sepcify host name")
cli.help()
cli.version(pjson.version);
const parsed = cli.parse();
if (parsed.options.host!==undefined && typeof parsed.options.host == "boolean" && parsed.options.host) {
    host = "0.0.0.0";
}

configureBackendRoutes(app);

const server = app.listen(port, host);

ViteExpress.bind(app, server, helloMessage);

handleInput();