import { NEXT_API_VERSION, SPARKHOME_VERSION, CLIENT_VERSION } from "@/lib/version";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
    const time = new Date().getTime() / 1000;
    const responseString = 
`SparkHome ${SPARKHOME_VERSION}
Client ${CLIENT_VERSION}
API ${NEXT_API_VERSION}
ServerTime ${time}
Powered by alikia2x (∠・ω< )⌒★`;
    return new Response(responseString);
}
