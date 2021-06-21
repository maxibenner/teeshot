import { softShadows } from "@react-three/drei"
import { Canvas, invalidate } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import { useSpring } from "react-spring/three"
import * as THREE from "three"
import useStore from "../../states/modelState"
import useRecorderStore from "../../states/recorderState"
import Credit from "../credit/Credit"
import Grid from "../grid/Grid"
import Hotkeys from "../hotkeys/Hotkeys"
import CanvasBackground from "./canvasBackground/CanvasBackground"
import DecalHelper from "./DecalHelper"
import Model from "./Model"
import RenderController from "./RenderController"
import Scenes from "./Scenes"
import CanvasSizer from "../canvasSizer/CanvasSizer"

softShadows({
    near: 0.03,
    samples: 20,
})

const Viewer = () => {
    const [modelRayData, setModelRayData] = useState(null)
    const [animPos, setAnimPos] = useState(0)
    const [dpr, setDpr] = useState(2)
    const modelUrl = "/tshirt.glb"
    const {
        animation,
        canvasSize,
        decalPath,
        decalSize,
        decrementDecalSize,
        incrementDecalSize,
        setGl,
        set,
        backgroundImage,
    } = useStore()
    const { active, mode } = useRecorderStore()

    useEffect(() => console.log(decalPath), [decalPath])
    // KEYDOWN
    useEffect(() => {
        function handlekeydownEvent(e) {
            const { key } = e
            if (!animation && !active) {
                if (key === "r") {
                }
                key === "r" && setAnimPos((prev) => (prev += 90)) //setModelFlipped((prev) => (prev ? false : true))
            }
            if (!active && decalPath) {
                e.preventDefault() // prevent arrow scrolling
                key === "ArrowUp" && incrementDecalSize(0.01)
                key === "ArrowDown" && decrementDecalSize(0.01)
            }
        }
        document.addEventListener("keydown", handlekeydownEvent)
        return () => {
            document.removeEventListener("keydown", handlekeydownEvent)
        }
    }, [active, decalPath, animation, animPos]) //eslint-disable-line

    // FLIP ANIMATION
    const flipModelAnimation = useSpring({
        config: { tension: 300, mass: 1.3 },
        rotation: [0, THREE.MathUtils.degToRad(animPos), 0],
        onChange: () => invalidate(),
    })

    // SET DPR
    useEffect(() => {
        setDpr(canvasSize.width / 600)
    }, [canvasSize])

    return (
        <CanvasBackground>
            <Hotkeys />
            {decalPath && <Grid />}
<<<<<<< HEAD
            <Canvas
<<<<<<< HEAD
                style={decalPath && { cursor: "none" }}
<<<<<<< HEAD
                gl={{
                    preserveDrawingBuffer: true,
<<<<<<< HEAD
                }}
                dpr={
                    window.devicePixelRatio >= 1.5
=======
                    //antialias: false,
                }}
=======
                gl={{ preserveDrawingBuffer: true }}
>>>>>>> acb6f32 (added record animation)
                dpr={
                    window.devicePixelRatio === 2
>>>>>>> 73da064 (high resolution and video)
                        ? 1.5
                        : window.devicePixelRatio
                }
=======
>>>>>>> 8b7aaea (working build with interval capture)
                camera={{ position: [0, 0, 2.2], fov: 50 }}
                dpr={[0.5, 2]}
                frameloop="demand"
                gl={{ preserveDrawingBuffer: true }}
                raycaster={{ far: 3.5 }}
                onCreated={(state) => setGl(state.gl)}
                shadows
                style={decalPath && { cursor: "none" }}
            >
                <DecalHelper modelRayData={modelRayData} size={decalSize} />
                <Suspense fallback={null}>
                    <Model
                        url={modelUrl}
                        rotation={flipModelAnimation.rotation}
                        setModelRayData={setModelRayData}
                    />
                </Suspense>
                <Scenes />
                {mode === "video" && <RenderController />}
            </Canvas>
=======
            <CanvasSizer>
                <Canvas
                    camera={{ position: [0, 0, 2.2], fov: 50 }}
                    dpr={dpr}
                    frameloop="demand"
                    gl={{ preserveDrawingBuffer: true }}
                    raycaster={{ far: 3.5 }}
                    onCreated={(state) => setGl(state.gl)}
                    shadows
                    style={decalPath && { cursor: "none" }}
                >
                    <DecalHelper modelRayData={modelRayData} size={decalSize} />
                    <Suspense fallback={null}>
                        <Model
                            url={modelUrl}
                            rotation={flipModelAnimation.rotation}
                            setModelRayData={setModelRayData}
                        />
                    </Suspense>
                    <Scenes />
                    {mode === "video" && <RenderController />}
                </Canvas>
            </CanvasSizer>
>>>>>>> 58632d8 (sign in and formats)
            {backgroundImage.author?.name && set === "bg_image" && (
                <Credit
                    name={backgroundImage.author.name}
                    link={backgroundImage.author.link}
                />
            )}
        </CanvasBackground>
    )
}

export default Viewer
