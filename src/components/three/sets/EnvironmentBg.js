import { Environment, useTexture } from "@react-three/drei"

const EnvironmentBg = () => {
    const texture = useTexture("/envBg1.jpg")
    return (
        <>
            <Environment background={false} path="/" files="env.hdr" />
            <mesh position={[0, 0, -0.5]}>
                <planeBufferGeometry args={[7, 5]} />
                <meshStandardMaterial map={texture} />
            </mesh>
        </>
    )
}

export default EnvironmentBg
