import { useLoader } from "@react-three/fiber"
import { useEffect, useState } from "react"
import * as THREE from "three"
import useStore from "../../../states/modelState"

const ImageBg = () => {
    const { backgroundImage } = useStore()
    const [url, setUrl] = useState("/images/placeholder.png")
    const [texture] = useLoader(THREE.TextureLoader, [url])

    // Check if image is a sample or custom
    useEffect(() => {
        if (backgroundImage.data != null) {
            const textureUrl = URL.createObjectURL(backgroundImage.data)
            setUrl(textureUrl)
        } else if (backgroundImage.path) {
            setUrl(backgroundImage.path)
        }
    }, [backgroundImage])

    // Normalize texture width / height
    const normalize = (width, height, max) => {
        if (width > height) {
            const factor = width / height
            return [factor * max, max]
        } else {
            const factor = height / width
            return [max, max * factor]
        }
    }

    return (
        <>
            <mesh position={[0, 0, -0.3]} receiveShadow>
                <planeBufferGeometry
                    args={
                        texture
                            ? normalize(
                                  texture.image.width,
                                  texture.image.height,
                                  3
                              )
                            : [3, 3]
                    }
                />
                <meshStandardMaterial map={texture} />
            </mesh>
        </>
    )
}

export default ImageBg
