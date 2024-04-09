import { completeGoogle } from "search-engine-autocomplete";
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('q')!;
    const language = "ja-JP";
    const data = await completeGoogle(query, language);
    return new Response(JSON.stringify(data));
}
