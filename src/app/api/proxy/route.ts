import { decodeParams, encodeParams } from "@/src/lib/utils/proxy";
import { getServerFile } from "@/src/lib/data/files/files-api";
import axios from "axios";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get("data");

  if (!data) {
    return new Response("Missing data parameter", { status: 400 });
  }

  const decodedData = decodeParams(data);
  if (!decodedData) {
    return new Response("Invalid data parameter", { status: 400 });
  }

  const targetUrl = decodedData.url;
  const { headers } = decodedData;

  try {
    if (!targetUrl) {
      return new Response("Missing URL parameter", { status: 400 });
    }

    // Handle server files differently
    if (targetUrl.startsWith("/files/")) {
      const parts = targetUrl.split("/");
      const streamDataId = parts[2];
      const fileName = parts[3];

      const response = await getServerFile(streamDataId, fileName);

      return new Response(response.data, {
        headers: {
          ...(response.headers as any),
        },
        status: response.status,
        statusText: response.statusText,
      });
    }

    // Handle external URLs
    const customHeaders = headers
      ? JSON.parse(decodeURIComponent(headers))
      : {};

    // fetch client caches the response and makes memory increase indefinitely. I can't find a way to clear the cache.
    // so we use axios to get the stream and return it as a response
    const response = await axios.get(targetUrl, {
      headers: {
        Accept: "*/*",
        Connection: "keep-alive",
        ...customHeaders,
      },
      responseType: "stream",
    });

    const contentType = response.headers["content-type"];

    if (
      contentType?.includes("application/vnd.apple.mpegurl") ||
      targetUrl.endsWith(".m3u8")
    ) {
      // Convert stream to text for m3u8 files
      const chunks: Buffer[] = [];
      for await (const chunk of response.data) {
        chunks.push(Buffer.from(chunk));
      }
      const text = Buffer.concat(chunks).toString("utf-8");

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
          ...(response.headers as any),
        },
        status: response.status,
        statusText: response.statusText,
      });
    }

    // For other responses, stream them directly
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response.data) {
            controller.enqueue(chunk);
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...(response.headers as any),
      },
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error: any) {
    console.error("Proxy Error:", error);
    return new Response(
      "Proxy Error: " + (error.response?.data || error.message),
      { status: error.response?.status || 500 }
    );
  }
}
