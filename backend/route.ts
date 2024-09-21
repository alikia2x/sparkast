import { Express } from "express";
import { completeGoogle } from "search-engine-autocomplete";

export function configureBackendRoutes(app: Express) {
	app.get("/api/v1/suggestion", async (req, res) => {
		const query = req.query.q as string;
		const t = parseInt((req.query.t as string) || "0") || null;
		let language = (req.query.l as string) || "en-US";

		try {
			const data = await completeGoogle(query, language);
			//logger.info({ type: "onesearch_search_autocomplete", query: query, data: data });
			res.json({ ...data, time: t });
		} catch (error) {
			//logger.error({ type: "onesearch_search_autocomplete_error", error: error.message });
			res.status(500).json({ error: "Internal Server Error" });
		}
	});
	app.get("/api/v1/ping", async (_, res) => {
		res.status(200).json({ message: "pong" });
	});
}
