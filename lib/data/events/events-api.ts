import {API_URL} from "@/lib/data/definitions";

const apiUrl = new URL(API_URL);
// vercel uses https, local uses ws
apiUrl.protocol = process.env.VERCEL ? 'https' : 'ws';
apiUrl.pathname = '/live/update';
export const wsUrl = apiUrl.href;