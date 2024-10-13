import chalk from "chalk";
import express from "express";
import ViteExpress from "vite-express";
import pjson from "./package.json";
import { networkInterfaces } from "os";
import cac from "cac";
import { configureBackendRoutes } from "./backend/route";
import { Server, IncomingMessage, ServerResponse } from "http";
import { getLocalhostAddressIfDiffersFromDNS, wildcardHosts } from "lib/server/startScript";

async function helloMessage() {
	const { base } = await ViteExpress.getViteConfig();
	const timeCost = Date.now() - start.getTime();
	console.log(
		`\n  ${chalk.redBright("sparkast v" + pjson.version)} ${chalk.whiteBright("ready in")} ${Math.round(timeCost)} ms\n`
	);
	console.log(`  ${chalk.redBright("➜  Local:")} ${chalk.cyan(`http://${name}:${port}${base}`)}`);
	if (host === undefined) {
		ips.forEach((ip) =>
			console.log(
				`  ${chalk.redBright("➜  Network:")} ${chalk.cyan(`http://${ip}:${port}${base}`)}`
			)
		);
	}
	console.log(`  ${chalk.red("➜  ")}${chalk.whiteBright("press h + enter to show help")}`);
}

async function handleInput(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
	for await (const line of console) {
		switch (line.trim()) {
			case "h":
				console.log(
					`  Shortcuts\n  ${chalk.whiteBright("press c + enter to clear console")}\n  ${chalk.whiteBright("press q + enter to quit")}`
				);
				break;
			case "c":
				console.clear();
				break;
			case "q":
				server.on("vite:close", () => {});
				server.close();
				return;
		}
	}
}

const start = new Date();
const cli = cac();
const nets = networkInterfaces();
const ips: string[] = Object.values(nets)
	.flat()
	.filter(
		(net) =>
			!!net && net.family === (typeof net.family === "string" ? "IPv4" : 4) && !net.internal
	)
	.map((net) => (!!net ? net.address : undefined))
	.filter((v) => v !== undefined);

const app = express();
const port = 3000;

let host: string | undefined = "localhost";

cli.option("--host [host]", "Specify host name").help().version(pjson.version);
const parsed = cli.parse();
const optionsHost: string | boolean | undefined = parsed.options.host;

if (optionsHost === undefined || optionsHost === false) {
	// Use a secure default
	host = "localhost";
} else if (optionsHost === true) {
	// If passed --host in the CLI without arguments
	host = undefined; // undefined typically means 0.0.0.0 or :: (listen on all IPs)
} else {
	host = optionsHost;
}

// Set host name to localhost when possible
let name = host === undefined || wildcardHosts.has(host) ? "localhost" : host;

if (host === "localhost") {
	const localhostAddr = await getLocalhostAddressIfDiffersFromDNS();
	if (localhostAddr) {
		name = localhostAddr;
	}
}

configureBackendRoutes(app);
// if the var `host` is undefined, then just not pass it.
const server = host ? app.listen(port, host) : app.listen(port);

ViteExpress.bind(app, server, helloMessage);

handleInput(server);
