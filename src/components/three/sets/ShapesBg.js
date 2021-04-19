import { invalidate, useFrame } from "@react-three/fiber"
import { useRef } from "react"

const ShapesBg = ({ backgroundColor }) => {
    const box = useRef()
    const sphere = useRef()
    const donut = useRef()
    const donutLarge = useRef()

    // ANIMATE
    useFrame(() => {
        box.current.rotation.y -= 0.015
        donut.current.rotation.y -= 0.015
        donutLarge.current.rotation.y -= 0.015
        invalidate()
    })

    return (
        <group>
            <mesh position={[0, 0, -0.5]} receiveShadow>
                <planeBufferGeometry args={[10, 10]} />
                <meshStandardMaterial
                    attach="material"
                    color={backgroundColor}
                />
            </mesh>
            <mesh
                ref={box}
                position={[0.5, 0, 0.5]}
                rotation={[4, 0, 0]}
                receiveShadow
            >
                <boxBufferGeometry args={[0.06, 0.06, 0.06]} />
                <meshStandardMaterial
                    attach="material"
                    color={backgroundColor}
                />
            </mesh>
            <mesh ref={sphere} position={[-0.5, -0.2, 0.5]} receiveShadow>
                <sphereBufferGeometry args={[0.05, 20, 20]} />
                <meshStandardMaterial
                    attach="material"
                    color={backgroundColor}
                />
            </mesh>
            <mesh
                ref={donutLarge}
                position={[-0.5, 0.6, 0]}
                rotation={[3, 5.5, 0]}
                receiveShadow
            >
                <torusBufferGeometry args={[0.07, 0.03, 10, 30]} />
                <meshStandardMaterial
                    attach="material"
                    color={backgroundColor}
                />
            </mesh>
            <mesh
                ref={donut}
                position={[0.15, -0.45, 0.3]}
                rotation={[2.2, 3.5, 2]}
                receiveShadow
            >
                <torusBufferGeometry args={[0.05, 0.02, 10, 30]} />
                <meshStandardMaterial
                    attach="material"
                    color={backgroundColor}
                />
            </mesh>
        </group>
    )
}

export default ShapesBg
