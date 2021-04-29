import { softShadows } from "@react-three/drei"
import { Canvas, invalidate } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import { useSpring } from "react-spring/three"
import useStore from "../../states/modelState"
import CanvasBackground from "./CanvasBackground"
import DecalHelper from "./DecalHelper"
import Model from "./Model"
import Scenes from "./Scenes"

softShadows({
    near: 0.04,
    samples: 20,
})

const Viewer = () => {
    const [modelFlipped, setModelFlipped] = useState(false)
    const [modelRayData, setModelRayData] = useState(null)
    const {
        decalPath,
        decalSize,
        decrementDecalSize,
        incrementDecalSize,
        setGl,
    } = useStore()

    // KEYDOWN
    useEffect(() => {
        function handlekeydownEvent(event) {
            const { key } = event
            key === "r" && setModelFlipped((prev) => (prev ? false : true))
            key === "ArrowUp" && incrementDecalSize(0.01)
            key === "ArrowDown" && decrementDecalSize(0.01)
        }
        document.addEventListener("keydown", handlekeydownEvent)
        return () => {
            document.removeEventListener("keydown", handlekeydownEvent)
        }
    }, [])

    // ANIMATION
    const flipModelAnimation = useSpring({
        config: { tension: 300, mass: 1.3 },
        rotation: modelFlipped ? [0, Math.PI / 1, 0] : [0, 0, 0],
        onChange: () => invalidate(),
    })

    return (
        <CanvasBackground>
            <Canvas
                style={decalPath && { cursor: "none" }}
                gl={{
                    preserveDrawingBuffer: true,
                }}
                dpr={
                    window.devicePixelRatio >= 1.5
                        ? 1.5
                        : window.devicePixelRatio
                }
                camera={{ position: [0, 0, 2.2], fov: 50 }}
                frameloop="demand"
                shadows
                onCreated={({ gl }) => setGl(gl)}
            >
                <DecalHelper modelRayData={modelRayData} size={decalSize} />
                <Suspense fallback={null}>
                    <Model
                        url="/tshirt.glb"
                        rotation={flipModelAnimation.rotation}
                        setModelRayData={setModelRayData}
                    />
                </Suspense>
                <Scenes />
            </Canvas>
        </CanvasBackground>
    )
}

export default Viewer
