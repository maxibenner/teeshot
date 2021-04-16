const ShapesBg = ({backgroundColor}) => {

    return (
        <group>
            <mesh position={[0, 0, -0.5]} receiveShadow>
                <planeBufferGeometry args={[10, 10]} />
                <meshStandardMaterial
                    attach="material"
                    color={backgroundColor}
                />
            </mesh>
            <mesh position={[0.5, 0, 0.5]} rotation={[4, 0, 0]} receiveShadow>
                <boxBufferGeometry args={[0.06, 0.06, 0.06]} />
                <meshStandardMaterial
                    attach="material"
                    color={backgroundColor}
                />
            </mesh>
            <mesh position={[-0.5, -0.2, 0.5]} receiveShadow>
                <sphereBufferGeometry args={[0.05, 20, 20]} />
                <meshStandardMaterial
                    attach="material"
                    color={backgroundColor}
                />
            </mesh>
            <mesh
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
