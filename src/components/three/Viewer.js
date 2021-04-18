import { softShadows } from "@react-three/drei"
import { Canvas, invalidate } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import { useSpring } from "react-spring/three"
import Fps from "../../helpers/Fps"
import useStore from "../../states/modelState"
import ControlPanel from "../ControlPanel"
import DecalManager from "../DecalManager"
import PhotoButton from "../PhotoButton"
import DecalHelper from "./DecalHelper"
import Model from "./Model"
import Scenes from "./Scenes"

softShadows({
    near: 0.03,
    samples: 20,
})

const Viewer = () => {
    const [modelFlipped, setModelFlipped] = useState(false)
    const [modelRayData, setModelRayData] = useState(null)
    const [gl, setGl] = useState(null)
    const {
        decals,
        decalPath,
        decalSize,
        incrementDecalSize,
        decrementDecalSize,
    } = useStore()

    // KEYDOWN
    useEffect(() => {
        function handlekeydownEvent(event) {
            const { key } = event
            key === "r" && setModelFlipped((prev) => (prev ? false : true))
            key === "ArrowUp" && incrementDecalSize(0.05)
            key === "ArrowDown" && decrementDecalSize(0.05)
        }
        document.addEventListener("keydown", handlekeydownEvent)
        return () => {
            document.removeEventListener("keydown", handlekeydownEvent)
        }
    }, [])

    // Set device pixel ratio
    /*useEffect(() => {
        if (gl) {
            if (window.devicePixelRatio >= 2) {
                gl.setPixelRatio(1.5)
            } else {
                gl.setPixelRatio(window.devicePixelRatio)
            }
        }
    }, [gl])*/

    // ANIMATION
    const flipModelAnimation = useSpring({
        config: { tension: 300, mass: 1.3 },
        rotation: modelFlipped ? [0, Math.PI / 1, 0] : [0, 0, 0],
        onChange: () => invalidate(),
    })

    return (
        <>
            <Fps />
            <Canvas
                onCreated={({ gl }) => setGl(gl)}
                style={decalPath && { cursor: "none" }}
                camera={{ position: [0, 0, 2.2], fov: 50 }}
                frameloop="demand"
                shadows
            >
                <DecalHelper modelRayData={modelRayData} size={decalSize} />
                <Suspense fallback={null}>
                    <Model
                        url="/tshirtLow.glb"
                        rotation={flipModelAnimation.rotation}
                        setModelRayData={setModelRayData}
                    />
                </Suspense>
                <Scenes />
            </Canvas>
            <PhotoButton gl={gl} />
            <ControlPanel />
            {decals.length > 0 && <DecalManager />}
        </>
    )
}

export default Viewer
