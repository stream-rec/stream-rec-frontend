import {API_URL} from "@/lib/data/api";

// remove api suffix
const apiUrl = new URL(API_URL);
apiUrl.protocol = 'ws';
apiUrl.pathname = '/live/update';
export const wsUrl = apiUrl.href;