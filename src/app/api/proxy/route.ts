"use server";
import { encodeParams } from "@/src/lib/utils/proxy";
import { getServerFile } from "@/src/lib/data/files/files-api";
import { NextRequest } from 'next/server';

// Add this export to mark the route as dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  let responseStream: ReadableStream | null = null;

  try {
    const { searchParams } = new URL(request.url);
    const data = searchParams.get("data");

    if (!data) {
      return new Response("Missing data parameter", { status: 400 });
    }

    const decodedData = JSON.parse(atob(data));
    const targetUrl = decodedData.url;
    const { headers } = decodedData;

    if (!targetUrl) {
      return new Response("Missing URL parameter", { status: 400 });
    }

    // Handle server files differently
    if (targetUrl.startsWith("/files/")) {
      const parts = targetUrl.split("/");
      const streamDataId = parts[2];
      const fileName = parts[3];

      const { stream, contentType, contentLength, contentDisposition } =
        await getServerFile(streamDataId, fileName);

      responseStream = stream;

      return new Response(responseStream, {
        headers: {
          "Content-Type": contentType,
          "Content-Length": contentLength || "",
          "Accept-Ranges": "bytes",
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
        "Accept": "*/*",
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

    // For other responses, store the stream for cleanup
    responseStream = response.body;

    return new Response(responseStream, {
      headers: {
        "Content-Type": contentType || "application/octet-stream",
        "Content-Length": response.headers.get("Content-Length") || "",
        "Accept-Ranges": "bytes",
      },
    });
  } catch (error: any) {
    console.error("Proxy Error:", error);
    return new Response("Proxy Error: " + error.message, { status: 500 });
  } finally {
    // Ensure proper cleanup of streams if something goes wrong after stream creation
    // but before returning the Response
    if (responseStream && !Response) {
      try {
        if (responseStream.cancel) {
          await responseStream.cancel();
        }
      } catch (cleanupError) {
        console.error("Error during stream cleanup:", cleanupError);
      }
    }
  }
}
