import { create } from "zustand";

type State = {
    apiKey: string | null
}

type Action = {
    updateOpenAIAPIKey: (apiKey: State['apiKey']) => void
}

export const useStore = create<State & Action>((set) => ({
    apiKey: null,
    updateOpenAIAPIKey: (apiKey) => set(() => ({ apiKey: apiKey })),
}))
