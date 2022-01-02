// HTTP Server を起動
const PORT = 8080;
const server = Deno.listen({ port: PORT });
console.log(`Port: ${PORT}`);

/**
 * HTTPリクエストのハンドラ
 *
 * @param request HTTPリクエスト
 */
const handleHttpRequest = async (request: Request): Promise<Response> => {
  console.log("Request:", request.method, request.url);
  const { pathname, search } = new URL(request.url);

  if (request.method === "POST") {
    // POST リクエストの場合は、リクエストボディを返す
    const payload = await request.text();
    const data = JSON.stringify({ pathname, payload }, null, 2);
    console.log("Request Data:", data);
    return new Response(data, {
      headers: { "Content-Type": "application/json" },
    });
  } else if (request.method === "GET") {
    // GET リクエストの場合は、クエリパラメータを返す
    const data = JSON.stringify({ pathname, search }, null, 2);
    console.log("Request Data:", data);
    return new Response(data, {
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response("Not Found", { status: 404 });
};

// リクエストを待機
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
