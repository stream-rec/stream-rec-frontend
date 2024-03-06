import {fetchApi} from "@/app/lib/data/api";
import {UploadData} from "@/app/lib/data/uploads/definitions";


export const fetchUploads = async () => {
  const response = await fetchApi(`/uploads`, {
    cache: 'no-cache'
  })
  if (!response.ok) {
    throw new Error("Error fetching uploads, status: " + response.status + " " + response.statusText)
  }
  let json = await response.json() as UploadData[]
  return json.map(upload => {
    upload.streamStartTime = upload.streamStartTime * 1000
    return upload
  })
}

export const fetchUpload = async (id: string) => {
  const response = await fetchApi(`/uploads/${id}`, {
    cache: 'no-cache'
  })
  if (!response.ok) {
    throw new Error("Error fetching upload, status: " + response.status + " " + response.statusText)
  }
  let json = await response.json() as UploadData
  json.streamStartTime = json.streamStartTime * 1000
  return json
}

export const deleteUpload = async (id: string) => {
  const response = await fetchApi('/uploads/' + id, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error("Error deleting upload, status: " + response.status + " " + response.statusText)
  }
}