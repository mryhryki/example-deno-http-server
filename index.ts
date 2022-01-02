const PORT = 8080;

const server = Deno.listen({ port: PORT });
console.log(`http://localhost:${PORT}/`);

const handleHttpRequest = async (request: Request): Promise<Response> => {
  const { pathname, searchParams } = new URL(request.url);

  if (request.method === "POST") {
    const payload = await request.text();
    const data = JSON.stringify({ pathname, payload }, null, 2);
    console.log("Request Data:", data);
    return new Response(data, {
      headers: { "Content-Type": "application/json" },
    });
  } else if (request.method === "GET") {
    const data = JSON.stringify({ pathname, searchParams }, null, 2);
    console.log("Request Data:", data);
    return new Response(data, {
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response("Not Found", { status: 404 });
};

for await (const conn of server) {
  (async () => {
    const httpConn = Deno.serveHttp(conn);
    for await (const requestEvent of httpConn) {
      await requestEvent.respondWith(
        await handleHttpRequest(requestEvent.request),
      );
    }
  })();
}
