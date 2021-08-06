import create from "zustand"

const useAppStore = create((set) => ({
    user: null,
    setUser: (user) => set((state) => (state.user = user)),
}))

export default useAppStore
