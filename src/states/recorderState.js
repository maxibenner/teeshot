import create from "zustand"

const useRecorderStore = create((set) => ({
    duration: 5,
    fps: 30,
    mode: "photo",
    active: false,
    setActive: (bool) => set((state) => (state.active = bool)),
    setDuration: (seconds) => set((state) => (state.duration = seconds)),
    setFps: (fps) => set((state) => (state.fps = fps)),
    setMode: (mode) => set((state) => (state.mode = mode)),
}))

export default useRecorderStore
