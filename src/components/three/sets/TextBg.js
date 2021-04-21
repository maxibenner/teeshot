import * as THREE from "three"
import { useMemo } from "react"
import { Center } from "@react-three/drei"
import IBMPS from "../../../assets/fonts/IBM Plex Mono_Bold.json"
import useStore from "../../../states/modelState"

const TextBg = ({ backgroundColor }) => {
    const { text } = useStore()

    const font = useMemo(() => {
        return new THREE.FontLoader().parse(IBMPS)
    }, [])

    const textOptions = {
        font,
        size: 0.7,
        height: 0.01,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.01,
    }


    return (
        <group>
            <mesh position={[0, 0, -4]}>
                <planeBufferGeometry args={[100, 100]} />
                <meshStandardMaterial color={backgroundColor} />
            </mesh>
            <Center>
                <mesh
                    position={[.3, 0, -2]}
                    rotation={[0, Math.PI / 20, Math.PI / 10]}
                >
                    <textBufferGeometry
                        attach="geometry"
                        args={[text, textOptions]}
                    />
                    <meshStandardMaterial
                        emissive={backgroundColor}
                        emissiveIntensity={.7}
                        color={backgroundColor}
                    />
                </mesh>
            </Center>
        </group>
    )
}

export default TextBg
