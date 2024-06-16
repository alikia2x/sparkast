import { completeGoogle } from "search-engine-autocomplete";
import { NextRequest } from "next/server"
import { suggestionsResponse } from "@/global";
import { logger } from "@/lib/log";

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('q')!;
    const t = parseInt(request.nextUrl.searchParams.get('t') || "0") || null;
    let language = request.nextUrl.searchParams.get('l');
    if (language === null) language = 'en-US';
    const data = await completeGoogle(query, language);
    logger.info({ type: "onesearch_search_autocomplete", query: query, data: data });
    return new Response(JSON.stringify({...data, time: t} as suggestionsResponse));
}
