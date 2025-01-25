export const encodeParams = (url: string, headers: any) => {
  const encodedParams = {
    url: url,
    headers: JSON.stringify(headers),
  };
  return btoa(JSON.stringify(encodedParams));
};
