import { softShadows } from "@react-three/drei"
import { Canvas, invalidate } from "@react-three/fiber"
import { Suspense, useEffect, useState, useMemo } from "react"
import { useSpring } from "react-spring/three"
import Fps from "../../helpers/Fps"
import useStore from "../../states/modelState"
import ControlPanel from "../ControlPanel"
import DecalManager from "../DecalManager"
import PhotoButton from "../PhotoButton"
import DecalHelper from "./DecalHelper"
import Model from "./Model"
import Scenes from "./Scenes"
import CanvasBackground from "./CanvasBackground"

softShadows({
    near: 0.04,
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
        <>
            <CanvasBackground>
                <Canvas
                    style={decalPath && { cursor: "none" }}
                    gl={{ preserveDrawingBuffer: true /*, antialias: false*/ }}
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
            <PhotoButton gl={gl} />
            <ControlPanel />
            {decals.length > 0 && <DecalManager />}
        </>
    )
}

const styles = {
    board: {
        height: "100%",
        backgroundImage:
            "linear-gradient(45deg, rgb(220,220,220) 25%, transparent 25%), linear-gradient(-45deg, rgb(220,220,220) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgb(220,220,220) 75%), linear-gradient(-45deg, transparent 75%, rgb(220,220,220) 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
    },
}

export default Viewer
