
export const encodeParams = (url: string, headers: any) => {
    const encodedParams= {
      url : url,
      headers : JSON.stringify(headers)
    }
    const b64Params = btoa(JSON.stringify(encodedParams));
    return b64Params;
  }