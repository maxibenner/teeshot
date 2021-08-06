import { invalidate, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState, useMemo } from "react"
import * as THREE from "three"
import { changeDimensions } from "../../helpers/math"
import useStore from "../../states/modelState"

var quaternion = new THREE.Quaternion(),
    vector = new THREE.Vector3(0, 0, 1)

const DecalHelper = ({ modelRayData, size }) => {
    const [decalTexture, setDecalTexture] = useState(null)
    const [decalDimensions, setdecalDimensions] = useState([0, 0])
    const [decalScale, setDecalScale] = useState(1)
    const initialDecalSize = useMemo(() => size, []) //eslint-disable-line

    // Global state
    const { decalPath } = useStore()

    const meshRef = useRef()

    // Match decal scale to new dimensions
    useEffect(() => {
        const newScale = size / initialDecalSize
        setDecalScale(newScale)
    }, [size]) //eslint-disable-line

    // LOAD TEXTURE + SET DIMENSIONS
    useEffect(() => {
        if (decalPath) {
            new THREE.TextureLoader().load(
                decalPath,
                (decalTexture) => {
                    setDecalTexture(decalTexture)
                    const newDimensions = changeDimensions(
                        decalTexture.image.width,
                        decalTexture.image.height,
                        size
                    )
                    setdecalDimensions(newDimensions)
                }
            )
        } else {
            setDecalTexture(null)
        }
    }, [decalPath]) //eslint-disable-line

    // SET POSITION & ORIENTATION
    const { viewport } = useThree()
    useFrame(({ mouse }) => {
        if (!meshRef.current) return
        else if (!modelRayData) {
            // Movement outside of mesh
            const x = (mouse.x * viewport.width) / 2
            const y = (mouse.y * viewport.height) / 2
            meshRef.current.position.set(x, y, 0)
            meshRef.current.rotation.set(0, 0, 0)
        } else if (modelRayData) {
            // Movement over mesh
            meshRef.current.position.set(
                modelRayData.position.x,
                modelRayData.position.y,
                modelRayData.position.z
            )
            quaternion.setFromUnitVectors(vector, modelRayData.normalWorld)
            meshRef.current.setRotationFromQuaternion(quaternion)
            meshRef.current.rotation.z = 0
        }
        invalidate()
    })

    return decalTexture ? (
        <mesh ref={meshRef} /*castShadow*/ scale={decalScale}>
            <planeBufferGeometry args={decalDimensions} />
            <meshStandardMaterial
                depthTest={/*modelRayData ?*/ false /*: true*/}
                map={decalTexture}
                transparent={true}
                anisotropy={16}
            />
        </mesh>
    ) : null
}

export default DecalHelper
