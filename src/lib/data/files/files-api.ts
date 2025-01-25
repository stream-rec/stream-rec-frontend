'use server'
import { fetchApi } from "../api"
import { fileResponse } from "./definitions"


export const getServerFiles = async (streamDataId: string) => {
    const response = await fetchApi(`/files/${streamDataId}`, {
        method: "GET",
        cache: "no-cache",
    })
    const data = await response.json()
    if (response.status !== 200) {
        throw new Error(`Failed to fetch files: ${response.statusText}`)
    }
    if (!fileResponse.safeParse(data).success) {
        throw new Error(`Failed to parse files: ${data}`)
    }
    return fileResponse.parse(data)
}


export const getServerFile = async (streamDataId: string, fileName: string) => {
    const response = await fetchApi(`/files/${streamDataId}/${fileName}`, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/octet-stream",
            "Accept-Ranges": "bytes",
        }
    })

    if (response.status !== 200) {
        throw new Error(`Failed to fetch file: ${response.statusText}`)
    }

    // response.headers.forEach((value, key) => {
    //     console.log("response header", key, value)
    // })

    return {
        stream: response.body,
        contentType: response.headers.get("Content-Type") || "application/octet-stream",
        contentLength: response.headers.get("Content-Length"),
        contentDisposition: response.headers.get("Content-Disposition"),
    }
}

export const checkFileExists = async (streamDataId: string, fileName: string): Promise<boolean> => {
    try {
        const response = await fetchApi(`/files/${streamDataId}/${fileName}/exists`, {
            method: "GET",
            cache: "no-cache",
        })

        if (response.status === 200) {
            const data = await response.json()
            return data.exists === true
        }

        return false
    } catch (error) {
        console.error("Error checking file existence:", error)
        return false
    }
}