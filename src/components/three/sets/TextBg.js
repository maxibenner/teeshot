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
        bevelThickness: 0.05,
        bevelSize: 0.005,
    }

    return (
        <Center>
            <mesh rotation={[0, 0, Math.PI / 10]} position={[.1, 0, -.3]} scale={.7}>
                <textBufferGeometry
                    attach="geometry"
                    args={[text, textOptions]}
                />
                <meshStandardMaterial
                    emissive={backgroundColor}
                    emissiveIntensity={0.7}
                    color={backgroundColor}
                />
            </mesh>
        </Center>
    )
}

export default TextBg
