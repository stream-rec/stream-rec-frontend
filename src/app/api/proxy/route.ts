'use server'
import { encodeParams } from "@/src/lib/utils/proxy";
import { getServerFile } from "@/src/lib/data/files/files-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get("data");

  if (!data) {
    return new Response("Missing data parameter", { status: 400 });
  }

  const decodedData = JSON.parse(atob(data));
  const targetUrl = decodedData.url;
  const headers = decodedData.headers;

  try {
    if (!targetUrl) {
      return new Response("Missing URL parameter", { status: 400 });
    }

    // Handle server files differently
    if (targetUrl.startsWith('/files/')) {
      const parts = targetUrl.split('/')
      const streamDataId = parts[2]
      const fileName = parts[3]

      // request.headers.forEach((value, key) => {
      //   console.log("request header", key, value)
      // })

      const { stream, contentType, contentLength, contentDisposition } = await getServerFile(streamDataId, fileName)


      return new Response(stream, {
        headers: {
          "Content-Type": contentType,
          "Content-Length": contentLength || "",
          "Accept-Ranges": "bytes",
          "Connection": "keep-alive",
          "Content-Disposition": contentDisposition || "",
        },
      });
    }

    // Handle external URLs
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

    // For other responses, stream them directly
    return new Response(response.body, {
      headers: {
        "Content-Type": contentType || "application/octet-stream",
        "Content-Length": response.headers.get("Content-Length") || "",
        "Accept-Ranges": "bytes",
      },
    });
  } catch (error: any) {
    console.error("Proxy Error:", error);
    return new Response("Proxy Error: " + error.message, { status: 500 });
  }
}
