import { create } from 'zustand'
import { MediaInfo, StreamInfo } from '../data/mediainfo/definitions'

interface PlayerState {
  streamerUrl: string | null
  mediaInfo : MediaInfo | null
  headers: Record<string, string> | null
  setMediaInfo: (mediaInfo: MediaInfo, headers: Record<string, string>) => void
  setStreamerUrl: (streamerUrl: string) => void
  clearMediaInfo: () => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  streamerUrl: null,
  mediaInfo: null,
  headers: null,
  setStreamerUrl: (streamerUrl: string) => set({ streamerUrl }),
  setMediaInfo: (mediaInfo, headers) => set({ mediaInfo, headers }),
  clearMediaInfo: () => set({ mediaInfo: null, headers: null })
})) 