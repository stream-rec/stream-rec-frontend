'use server'
import {fetchApi} from "@/lib/data/api";
import {UploadData, UploadResult, UploadSearchParams} from "@/lib/data/uploads/definitions";

export const fetchUploads = async (search: UploadSearchParams) => {
  const {page, per_page, status, streamTitle, streamer, sort, order} = search
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('per_page', per_page.toString())
  if (status) {
    // Convert to backend filter string
    status.split('.').forEach((s) => {
      params.append('status', s)
    })
  }
  if (streamTitle) {
    // Convert to backend filter string
    params.append('filter', streamTitle)
  }
  if (streamer) {
    streamer.split('.').forEach((s) => {
      params.append('streamer', s)
    })
  }

  if (sort && order) {
    params.append('sort', sort === 'streamTitle' ? 'title' : sort || 'id')
    params.append('order', order || '')
  }

  const response = await fetchApi('/uploads' + '?' + params.toString(), {
    cache: 'no-cache'
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error fetching uploads, status: " + response.status + " " + errorText)
  }
  let json = await response.json() as { data: UploadData[], pages: number }
  return {
    data: json.data,
    pageCount: json.pages
  }
}

export const fetchUpload = async (id: string) => {
  const response = await fetchApi(`/uploads/${id}`, {
    cache: 'no-cache'
  })
  if (!response.ok) {
    throw new Error("Error fetching upload, status: " + response.status + " " + response.statusText)
  }
  let json = await response.json() as UploadData
  return json
}

export const fetchUploadResults = async (id: string) => {
  const response = await fetchApi(`/uploads/${id}/results`, {
    cache: 'no-cache'
  })
  if (!response.ok) {
    throw new Error("Error fetching upload results, status: " + response.status + " " + response.statusText)
  }
  return await response.json() as UploadResult[]
}

export const retryUpload = async (id: string) => {
  const response = await fetchApi(`/uploads/${id}/retry`, {
    method: 'POST'
  })
  if (!response.ok) {
    throw new Error("Error retrying upload, status: " + response.status + " " + response.statusText)
  }
}


export const deleteUpload = async (id: string) => {
  const response = await fetchApi('/uploads/' + id, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error("Error deleting upload, status: " + response.status + " " + response.statusText)
  }
}

export const deleteUploads = async (ids: number[]) => {
  const response = await fetchApi('/uploads/batch?ids=' + ids, {
    method: 'DELETE',
    cache: 'no-cache',
  })
  if (!response.ok) {
    throw new Error("Error deleting uploads, status: " + response.status + " " + response.statusText)
  }
}