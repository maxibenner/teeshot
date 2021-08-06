import { Environment, useTexture, MeshWobbleMaterial } from "@react-three/drei"
import { invalidate, useFrame } from "@react-three/fiber"

const EnvironmentBg = () => {
    const texture = useTexture("/envBg.jpg")
    useFrame(() => {
        invalidate()
    })
    return (
        <>
            <Environment background={false} path="/" files="env.hdr" />
            <mesh position={[0, 0, -0.5]}>
                <planeBufferGeometry args={[7, 5]} />
                <MeshWobbleMaterial map={texture} factor={0.1} speed={.3} />
            </mesh>
        </>
    )
}

export default EnvironmentBg
