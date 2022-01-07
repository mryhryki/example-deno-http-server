import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const PORT = 8080;

const handler = async (request: Request): Promise<Response> => {
  console.log("Request:", request.method, request.url);
  const { pathname, search } = new URL(request.url);

  if (request.method === "GET") {
    // GET リクエストの場合は、クエリパラメータを返す
    const data = JSON.stringify({ pathname, search, test: true }, null, 2);
    console.log("Request Data:", data);
    return new Response(data, {
      headers: { "Content-Type": "application/json" },
    });
  } else if (request.method === "POST") {
    // POST リクエストの場合は、リクエストボディを返す
    const payload = await request.text();
    const data = JSON.stringify({ pathname, payload, test: true }, null, 2);
    console.log("Request Data:", data);
    return new Response(data, {
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response("[TEST] Not Found", { status: 404 });
};

console.log(`Listening on http://localhost:${PORT}/`);
await serve(handler, { addr: `:${PORT}` });
