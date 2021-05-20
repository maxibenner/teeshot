import { softShadows } from "@react-three/drei"
import { Canvas, invalidate } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import { useSpring } from "react-spring/three"
import useStore from "../../states/modelState"
import useRecorderStore from "../../states/recorderState"
import CanvasBackground from "./canvasBackground/CanvasBackground"
import DecalHelper from "./DecalHelper"
import Model from "./Model"
import RenderController from "./RenderController"
import Scenes from "./Scenes"

softShadows({
    near: 0.04,
    samples: 20,
})

const Viewer = () => {
    const [modelFlipped, setModelFlipped] = useState(false)
    const [modelRayData, setModelRayData] = useState(null)
    const modelUrl = "/tshirt.glb"
    const {
        animation,
        decalPath,
        decalSize,
        decrementDecalSize,
        incrementDecalSize,
        setGl,
    } = useStore()
    const { active, mode } = useRecorderStore()

    useEffect(() => console.log(decalPath), [decalPath])
    // KEYDOWN
    useEffect(() => {
        function handlekeydownEvent(event) {
            const { key } = event
            if (!animation && !active) {
                console.log(animation)
                key === "r" && setModelFlipped((prev) => (prev ? false : true))
            }
            if (!active && decalPath) {
                key === "ArrowUp" && incrementDecalSize(0.01)
                key === "ArrowDown" && decrementDecalSize(0.01)
            }
        }
        document.addEventListener("keydown", handlekeydownEvent)
        return () => {
            document.removeEventListener("keydown", handlekeydownEvent)
        }
    }, [active, decalPath, animation])

    // FLIP ANIMATION
    const flipModelAnimation = useSpring({
        config: { tension: 300, mass: 1.3 },
        rotation: modelFlipped ? [0, Math.PI / 1, 0] : [0, 0, 0],
        onChange: () => invalidate(),
    })

    return (
        <CanvasBackground>
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
        </CanvasBackground>
    )
}

export default Viewer
