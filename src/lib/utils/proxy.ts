export const encodeParams = (url: string, headers: any) => {
  const encodedParams = {
    url: url,
    headers: JSON.stringify(headers),
  };
  return Buffer.from(JSON.stringify(encodedParams)).toString('base64');
};

export const decodeParams = (data: string) => {
  try {
    const decodedData = JSON.parse(Buffer.from(data, 'base64').toString());
    return decodedData;
  } catch (error) {
    console.error("Error decoding data:", error, data);
    return null;
  }
};