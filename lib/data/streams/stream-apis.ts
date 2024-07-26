'use server'
import {fetchApi} from "@/lib/data/api";
import {StreamData, StreamsSearchParams} from "@/lib/data/streams/definitions";

export const fetchStreams = async (search: StreamsSearchParams) => {
  const {page, per_page, sort, order, dateStart, dateEnd, streamerName, title} = search
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('per_page', per_page.toString())

  if (dateStart) {
    // if dateStart has dotted format, split it and append each part to the params
    let dates = dateStart.split('.')
    const dateStartNumber = Math.floor(Number(dates[0]) / 1000)
    params.append('date_start', dateStartNumber.toString())
    if (dates.length > 1) {
      let dateEndNumber = Math.floor(Number(dates[1]) / 1000)
      params.append('date_end', dateEndNumber.toString())
    }
  }

  if (sort && order) {
    params.append('sort', sort)
    params.append('order', order)
  } else {
    params.append('sort', 'id')
    params.append('order', 'DESC')
  }

  if (streamerName) {
    streamerName.split('.').forEach((s) => {
      params.append('streamer', s)
    })
  }

  if (title && title.length > 0) {
    params.append('filter', title)
  }

  const response = await fetchApi('/streams' + '?' + params.toString(), {
    cache: 'no-cache'
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error fetching streams, status: " + response.status + " " + errorText)
  }
  let json = await response.json() as { data: StreamData[], pages: number }
  const results = json.data.map(stream => {
    // Convert seconds to milliseconds
    stream.dateStart = stream.dateStart * 1000
    stream.dateEnd = stream.dateEnd * 1000
    return stream
  })
  return {
    data: results,
    pageCount: json.pages
  }
}

export const fetchStream = async (id: string) => {
  const response = await fetchApi('/streams/' + id, {
    cache: 'no-cache'
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error fetching stream, status: " + response.status + " " + errorText)
  }
  let json = await response.json() as StreamData
  // Convert seconds to milliseconds
  json.dateStart = json.dateStart * 1000
  json.dateEnd = json.dateEnd * 1000
  return json
}
export const deleteStream = async (id: string) => {
  const response = await fetchApi('/streams/' + id, {
    cache: 'no-cache',
    method: 'DELETE'
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error deleting stream, status: " + response.status + " " + errorText)
  }
}

export const deleteStreams = async (ids: number[]) => {
  const response = await fetchApi('/streams/batch?ids=' + ids, {
    cache: 'no-cache',
    method: 'DELETE',
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error("Error deleting streams, status: " + response.status + " " + errorText)
  }
}