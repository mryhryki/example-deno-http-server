import { serve } from "https://deno.land/std@0.116.0/http/server.ts";

const PORT = 8080;

serve((request: Request): Response => {
  const url = new URL(request.url);
  const path = url.pathname;

  if (request.method === "POST") {
    return new Response(request.body, {
      headers: {
        "Content-Type": request.headers.get("Content-Type") || "application/octet-stream",
      },
    });
  } else if (path === "/") {
    return new Response("<h1>example-deno-http-server</h1>", {
      headers: {
        "Content-Type": "text/html; charset=utf8",
      },
    });
  } else if (path.startsWith("/test/")) {
    return new Response(
      JSON.stringify({ test: true, param: path.substring(6) }, null, 2),
      {
        headers: {
          "Content-Type": "application/json; charset=utf8",
        },
      },
    );
  }
  return new Response("Not Found", { status: 404 });
}, { addr: `:${PORT}` });

console.log(`http://localhost:${PORT}/`);
