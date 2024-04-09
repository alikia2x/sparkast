import { completeGoogle } from "search-engine-autocomplete";
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('q')!;
    let language = request.nextUrl.searchParams.get('l');
    if (language === null) language = 'en-US';
    const data = await completeGoogle(query, language);
    const completeWord: string | undefined = data.suggestions.filter((s) => {
        return s.relativeRelevance > 0.96
    })[0]?.suggestion;
    return new Response(completeWord ? completeWord : query);
}
