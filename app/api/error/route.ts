import { logger } from "@/lib/log";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    logger.warn({type:"client_telemetering",error:data});
    return new Response();
}
