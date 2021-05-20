import create from "zustand"

const useRecorderStore = create((set) => ({
    active: null,
    duration: 7,
    fps: 30,
    mode: "photo",
    progress: 0, // as stroke-dashoffset max = 204
    setActive: (bool) => set((state) => (state.active = bool)),
    setDuration: (seconds) => set((state) => (state.duration = seconds)),
    setFps: (fps) => set((state) => (state.fps = fps)),
    setMode: (mode) => set((state) => (state.mode = mode)),
    setProgress: (percent) => set((state) => (state.progress = percent)),
}))

export default useRecorderStore
