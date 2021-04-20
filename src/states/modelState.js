import create from "zustand"

const initialDecalSize = 0.2

const useStore = create((set) => ({
    backgroundColor: "#ffffff",
    decals: [],
    decalImages: [],
    decalPath: null,
    initialDecalSize: initialDecalSize,
    decalSize: initialDecalSize,
    modelColor: "#ffffff",
    set: "ShapesBg",
    setBackgroundColor: (color) =>
        set((state) => (state.backgroundColor = color)),
    addDecal: (decalObject) =>
        set((state) => (state.decals = [...state.decals, decalObject])),
    removeDecal: (decalKey) =>
        set(
            (state) =>
                (state.decals = state.decals.filter((el) => el.key != decalKey))
        ),
    setDecalPath: (decalPath) => set((state) => (state.decalPath = decalPath)),
    addDecalImages: (decal) =>
        set((state) => (state.decalImages = [...state.decalImages, decal])),
    setDecalImages: (array) => set((state) => (state.decalImages = array)),
    incrementDecalSize: (value) =>
        set((state) => (state.decalSize = state.decalSize + value)),
    decrementDecalSize: (value) =>
        set((state) => (state.decalSize = state.decalSize - value)),
    setDecalSize: (size) => set((state) => (state.decalSize = size)),
    setModelColor: (color) => set((state) => (state.modelColor = color)),
    setSet: (componentName) => set((state) => (state.set = componentName)),
}))

export default useStore
