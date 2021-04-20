import { Environment, useTexture } from "@react-three/drei"

const EnvironmentBg = () => {
    const texture = useTexture("/envBg.jpg")
    return (
        <>
            <Environment background={false} path="/" files="env.hdr" />
            <mesh position={[0, 0, -0.5]}>
                <planeBufferGeometry args={[5, 3]} />
                <meshBasicMaterial map={texture} />
            </mesh>
        </>
    )
}

export default EnvironmentBg
