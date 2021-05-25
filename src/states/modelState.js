import create from "zustand"

const initialDecalSize = 0.2

const useStore = create((set) => ({
    animation: null,
    backgroundColor: "#ffffff",
    backgroundImage: {
        data: null,
        name: null,
        path: null,
        author: { name: null, link: null },
    },
    decalImages: [],
    decalPath: null,
    decals: [],
    decalSize: initialDecalSize,
    gl: null,
    initialDecalSize: initialDecalSize,
    modelColor: "#ffffff",
    props: null,
    set: "bg_color",
    text: "TEXT",
    setAnimation: (animation) => set((state) => (state.animation = animation)),
    addDecal: (decalObject) =>
        set((state) => (state.decals = [...state.decals, decalObject])),
    addDecalImages: (decal) =>
        set((state) => (state.decalImages = [...state.decalImages, decal])),
    decrementDecalSize: (value) =>
        set((state) => (state.decalSize = state.decalSize - value)),
    incrementDecalSize: (value) =>
        set((state) => (state.decalSize = state.decalSize + value)),
    removeDecal: (decalKey) =>
        set(
            (state) =>
                (state.decals = state.decals.filter((el) => el.key != decalKey))
        ),
    setBackgroundImage: ({
        data = null,
        name = null,
        path = null,
        author = null,
    }) =>
        set(
            (state) =>
                (state.backgroundImage = {
                    data: data,
                    name: name,
                    path: path,
                    author: author,
                })
        ),
    setBackgroundColor: (color) =>
        set((state) => (state.backgroundColor = color)),
    setDecalImages: (array) => set((state) => (state.decalImages = array)),
    setDecalPath: (decalPath) => set((state) => (state.decalPath = decalPath)),
    setDecalSize: (size) => set((state) => (state.decalSize = size)),
    setGl: (gl) => set((state) => (state.gl = gl)),
    setModelColor: (color) => set((state) => (state.modelColor = color)),
    setProps: (name) => set((state) => (state.props = name)),
    setSet: (componentName) => set((state) => (state.set = componentName)),
    setText: (text) => set((state) => (state.text = `${text}`)),
}))

export default useStore
