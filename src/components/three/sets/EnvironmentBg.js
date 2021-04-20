import { Environment, useTexture } from "@react-three/drei"

const EnvironmentBg = () => {
    const texture = useTexture("/envBg4.jpg")
    return (
        <>
            <Environment preset="dawn" background={false} />
            <mesh position={[0, 0, -0.5]}>
                <planeBufferGeometry args={[5, 3]} />
                <meshBasicMaterial map={texture} />
            </mesh>
        </>
    )
}

export default EnvironmentBg
