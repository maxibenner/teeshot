import React from "react"

const Lights = () => {
    return (
        <>
            <ambientLight intensity={0.35} />
            <directionalLight
                castShadow
                position={[0.5, 0.3, 1]}
                intensity={0.5}
            />
            <pointLight position={[0, 50, 0]} intensity={1.4} />
        </>
    )
}

export default Lights
