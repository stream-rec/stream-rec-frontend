"use server";
import { fetchApi } from "../api";
import { fileResponse } from "./definitions";
import axios from "axios";
import { API_URL } from "@/src/lib/data/definitions";
import { auth } from "@/auth";
import { redirect } from "@/src/i18n/routing";

export const getServerFiles = async (streamDataId: string) => {
  const response = await fetchApi(`/files/${streamDataId}`, {
    method: "GET",
    cache: "no-cache",
  });
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error(`Failed to fetch files: ${response.statusText}`);
  }
  if (!fileResponse.safeParse(data).success) {
    throw new Error(`Failed to parse files: ${data}`);
  }
  return fileResponse.parse(data);
};

export const getServerFile = async (streamDataId: string, fileName: string) => {
  const session = await auth();
  const headers: Record<string, string> = {
    "Content-Type": "application/octet-stream",
    "Accept-Ranges": "bytes",
  };

  if (session?.user?.token) {
    headers["Authorization"] = `Bearer ${session.user.token}`;
  }

  try {
    const response = await axios.get(
      `${API_URL}/files/${streamDataId}/${fileName}`,
      {
        headers,
        responseType: "stream",
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      redirect({
        href: "/logout",
        locale: "en",
      });
    }
    throw new Error(`Failed to fetch file: ${error}`);
  }
};

export const checkFileExists = async (
  streamDataId: string,
  fileName: string
): Promise<boolean> => {
  try {
    const response = await fetchApi(
      `/files/${streamDataId}/${fileName}/exists`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      return data.exists === true;
    }

    return false;
  } catch (error) {
    console.error("Error checking file existence:", error);
    return false;
  }
};
