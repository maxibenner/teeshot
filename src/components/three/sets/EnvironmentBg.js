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
                <planeBufferGeometry args={[5, 3]} />
                {/*<meshBasicMaterial map={texture} />*/}
                <MeshWobbleMaterial
                    map={texture}
                    factor={.1} // Strength, 0 disables the effect (default=1)
                    speed={1} // Speed (default=1)
                />
            </mesh>
        </>
    )
}

export default EnvironmentBg
