import { create } from "zustand"
import { persist } from "zustand/middleware"
import { devtools } from "zustand/middleware"
import { UpdateSchema } from "@/src/lib/data/events/definitions"

interface LiveStreamState {
	updates: Record<number, UpdateSchema>
	setUpdate: (streamerId: number, data: UpdateSchema) => void
	clearUpdates: () => void
	setBatchUpdates: (updates: Record<number, UpdateSchema>) => void
}

export const useLiveStreamStore = create<LiveStreamState>()(
	devtools(
		persist(
			set => ({
				updates: {},
				setUpdate: (streamerId, data) =>
					set(
						state => {
							const current = state.updates[streamerId]
							// Only update if data has changed
							if (
								current &&
								current.bitrate === data.bitrate &&
								current.duration === data.duration &&
								current.url === data.url
							) {
								return state
							}
							return {
								updates: {
									...state.updates,
									[streamerId]: data,
								},
							}
						},
						false,
						"setUpdate"
					),
				clearUpdates: () => set({ updates: {} }, false, "clearUpdates"),
				setBatchUpdates: newUpdates =>
					set(
						state => {
							const updates = { ...state.updates }
							let hasChanges = false

							Object.entries(newUpdates).forEach(([id, data]) => {
								const current = updates[Number(id)]
								if (
									!current ||
									current.bitrate !== data.bitrate ||
									current.duration !== data.duration ||
									current.url !== data.url
								) {
									updates[Number(id)] = data
									hasChanges = true
								}
							})

							return hasChanges ? { updates } : state
						},
						false,
						"setBatchUpdates"
					),
			}),
			{
				name: "live-stream-storage",
				partialize: state => ({
					updates: state.updates,
				}),
			}
		)
	)
)
