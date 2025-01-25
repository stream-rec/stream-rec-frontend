import { create } from 'zustand'
import { MediaInfo, StreamInfo } from '../data/mediainfo/definitions'

export type PlayerSource = {
  type: 'stream' | 'server-file'
  url: string
  recordId?: string
}

interface PlayerState {
  source: PlayerSource | null
  mediaInfo: MediaInfo | null
  headers: Record<string, string> | null
  setMediaInfo: (mediaInfo: MediaInfo, headers: Record<string, string>) => void
  setSource: (source: PlayerSource) => void
  clearMediaInfo: () => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  source: null,
  mediaInfo: null,
  headers: null,
  setSource: (source: PlayerSource) => set({ source }),
  setMediaInfo: (mediaInfo, headers) => set({ mediaInfo, headers }),
  clearMediaInfo: () => set({ mediaInfo: null, headers: null })
})) 