// Google News RSS relay. Only fixed upstream is accessible.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== "GET") return new Response("Method not allowed", {status:405});
    if (url.pathname === "/health") return Response.json({ok:true, timestamp:new Date().toISOString()});
    if (url.pathname !== "/rss") return env.ASSETS.fetch(request);
    const q = (url.searchParams.get("q") || "炎上 OR 物議 OR 批判殺到 OR 謝罪").trim();
    if (!q || q.length > 150) return new Response("Invalid query", {status:400});
    const upstream = new URL("https://news.google.com/rss/search");
    for (const [key,value] of Object.entries({q,hl:"ja",gl:"JP",ceid:"JP:ja"})) upstream.searchParams.set(key,value);
    try {
      const response = await fetch(upstream.toString(), {
        headers: {Accept:"application/rss+xml, application/xml, text/xml"},
        cf: {cacheTtl:900,cacheEverything:true}
      });
      if (!response.ok) return new Response("Upstream unavailable", {status:502});
      const xml = await response.text();
      if (xml.length > 2000000 || !xml.includes("<rss")) return new Response("Unexpected feed", {status:502});
      return new Response(xml, {headers:{"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"public, max-age=300","X-Content-Type-Options":"nosniff"}});
    } catch {
      return new Response("RSS fetch failed", {status:502});
    }
  }
};