import { softShadows } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import { useSpring } from "react-spring/three"
import Fps from "../../helpers/Fps"

import useStore from "../../states/modelState"
import ControlPanel from "../ControlPanel"
import Back from "./Back"
import DecalHelper from "./DecalHelper"
import Lights from "./Lights"
import Model from "./Model"
import DecalManager from "../DecalManager"

softShadows({
    near: 0.03,
    samples: 20,
})

const Viewer = () => {
    const [modelFlipped, setModelFlipped] = useState(false)
    const [modelRayData, setModelRayData] = useState(null)
    const {
        backgroundColor,
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

    // ANIMATION
    const flipModelAnimation = useSpring({
        config: { tension: 300, mass: 1.3 },
        rotation: modelFlipped ? [0, Math.PI / 1, 0] : [0, 0, 0],
    })

    return (
        <>
            <Fps />
            <Canvas
                style={decalPath && { cursor: "none" }}
                //gl={{ pixelratio: window.devicePixelRatio }}
                camera={{ position: [0, 0, 1.2] }}
                //frameloop="demand"
                shadows
            >
                <DecalHelper modelRayData={modelRayData} size={decalSize} />
                <Suspense fallback={null}>
                    <Model
                        url="/tshirtVeryLow.glb"
                        rotation={flipModelAnimation.rotation}
                        setModelRayData={setModelRayData}
                    />
                </Suspense>
                <Back color={backgroundColor} />
                <Lights />
            </Canvas>
            <ControlPanel />
            {decals.length > 0  && <DecalManager />}
        </>
    )
}

export default Viewer
