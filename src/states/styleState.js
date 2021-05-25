import create from "zustand"

const styleState = create((set) => ({
    mode: "day",
    color: "black",
    background: "white",
    setMode: (mode) => set((state) => (state.mode = mode)),
}))

export default styleState
