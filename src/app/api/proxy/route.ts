'use server'
import { encodeParams } from "@/src/lib/utils/proxy";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get("data");
  // console.log("data", data);
  if (!data) {
    return new Response("Missing data parameter", { status: 400 });
  }
  const decodedData = JSON.parse(atob(data));
  const targetUrl = decodedData.url;
  const headers = decodedData.headers;

  // console.log("decodedData", decodedData)
  // console.log("targetUrl", targetUrl);
  // console.log("headers", headers);

  try {
    if (!targetUrl) {
      return new Response("Missing URL parameter", { status: 400 });
    }

    const customHeaders = headers
      ? JSON.parse(decodeURIComponent(headers))
      : {};
    
    

    const response = await fetch(targetUrl, {
      headers: {
        'Accept': '*/*',
        'Connection': 'keep-alive',
        ...customHeaders,
      },
    });

    // console.log("response", response)

    const contentType = response.headers.get("Content-Type");

    if (
      contentType?.includes("application/vnd.apple.mpegurl") ||
      targetUrl.endsWith(".m3u8")
    ) {
      const text = await response.text();
      const rewrittenText = text.replace(
        /(^https?:\/\/[^\s]*|^[^#][^\s]*)/gm,
        (match) => {
          if (!match.startsWith("http")) {
            const baseUrl = new URL(targetUrl);
            match = new URL(
              match,
              baseUrl.origin + baseUrl.pathname
            ).toString();
          }
          return `/api/proxy?data=${encodeParams(match, customHeaders)}`;
        }
      );

      return new Response(rewrittenText, {
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
        },
      });
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": contentType || "application/octet-stream",
      },
    });
  } catch (error: any) {
    console.log("error", error.message);
    return new Response("Proxy Error: " + error.message, { status: 500 });
  }
}
