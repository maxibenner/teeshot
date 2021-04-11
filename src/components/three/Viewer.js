import { softShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring/three";
import Back from "./Back";
import DecalHelper from "./DecalHelper";
import Lights from "./Lights";
import Model from "./Model";

softShadows({
    near: 0.03,
    samples: 20,
});

const Viewer = () => {
    console.log("Viewer");
    const [modelFlipped, setModelFlipped] = useState(false);
    const [modelRayData, setModelRayData] = useState(null);
    const [activeDecalPath, setActiveDecalPath] = useState(null);
    const [decalTransform, setDecalTransform] = useState({
        size: 0.2,
        rotation: 0,
    });
    const [decalSize, setDecalSize] = useState(0.2);
    const [decalRotation, setDecalRotation] = useState(0);

    const inputRef = useRef();

    // KEYDOWN
    useEffect(() => {
        function handlekeydownEvent(event) {
            const { key } = event;
            key === "r" && setModelFlipped((prev) => (prev ? false : true));
            key === "ArrowUp" && setDecalSize((prev) => prev + 0.05);
            key === "ArrowDown" && setDecalSize((prev) => prev - 0.05);
            key === "ArrowLeft" && setDecalRotation((prev) => prev + 0.5);
            key === "ArrowRight" && setDecalRotation((prev) => prev - 0.5);
        }
        document.addEventListener("keydown", handlekeydownEvent);
        return () => {
            document.removeEventListener("keydown", handlekeydownEvent);
        };
    }, []);

    // SET ACTIVE DECAL PATH
    const loadDecal = () => {
        const path = URL.createObjectURL(inputRef.current.files[0]);
        setActiveDecalPath(path);
    };

    // ANIMATION
    const flipModelAnimation = useSpring({
        config: { tension: 300, mass: 1.3 },
        rotation: modelFlipped ? [0, Math.PI / 1, 0] : [0, 0, 0],
    });

    return (
        <>
            <Canvas
                style={activeDecalPath && { cursor: "none" }}
                gl={{ pixelratio: window.devicePixelRatio }}
                camera={{ position: [0, 0, 1.2] }}
                frameloop="demand"
                shadows
            >
                <DecalHelper
                    modelRayData={modelRayData}
                    activeDecalPath={activeDecalPath}
                    size={decalSize}
                    rotation={decalRotation}
                />
                <Suspense fallback={null}>
                    <Model
                        url="/tshirtNew.glb"
                        rotation={flipModelAnimation.rotation}
                        activeDecalPath={activeDecalPath}
                        decalSize={decalSize}
                        setModelRayData={setModelRayData}
                        setActiveDecalPath={setActiveDecalPath}
                        setDecalSize={setDecalSize}
                    />
                </Suspense>
                <Back />
                <Lights />
            </Canvas>
            <div
                style={{
                    position: "absolute",
                    top: "8px",
                    background: "white",
                    borderRadius: "5px",
                    margin: "5px",
                    padding: "5px 5px 3px 5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
            >
                <input onInput={() => loadDecal()} ref={inputRef} type="file" />
                {activeDecalPath && (
                    <button onClick={() => setActiveDecalPath(null)}>
                        Cancel
                    </button>
                )}
            </div>
        </>
    );
};

export default Viewer;
