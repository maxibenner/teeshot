import { extend } from "@react-three/fiber"
import * as THREE from "three"
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry"
import { changeDimensions } from "../../helpers/math"

const Decals = ({ decals }) => {
    return <mesh>{decals.map((decal) => decal.mesh)};</mesh>
}
export default Decals

// INIT
var helper = new THREE.Object3D(),
    eulerHelper = new THREE.Euler(0, 0, 0),
    posHelper = new THREE.Euler(0, 0, 0)

export const createDecal = (mesh, position, normal, activeDecal, maxSize) => {
    // INFO: This component works with a state array in the parent that holds the decal meshes.
    extend({ DecalGeometry })

    // Check for active decal
    if (!activeDecal) {
        window.alert("Choose a design to apply to the product.")
        return { decal: null, key: null }
    }

    // Texture settings
    activeDecal.anisotropy = 16

    // Get texture size
    const dimensions = changeDimensions(
        activeDecal.image.width,
        activeDecal.image.height,
        maxSize
    )

    // ORIENTATION
    var n = normal.clone()
    n.add(position)

    helper.position.copy(position)
    helper.lookAt(n)

    // COUNTERACT ROTATION
    eulerHelper.setFromRotationMatrix(mesh.matrixWorld)

    // COUNTER POSITION
    posHelper.setFromVector3(mesh.localToWorld(mesh.position))

    // KEY
    const key = Math.floor(Math.random() * 999999)

    // Return decal
    return {
        decal: (
            <mesh
                key={key}
                name="decal"
                rotation={[
                    eulerHelper.x * -1,
                    eulerHelper.y * -1,
                    eulerHelper.z * -1,
                ]}
                position={[
                    posHelper.x * -1,
                    posHelper.y * -1,
                    posHelper.z * -1,
                ]}
            >
                <decalGeometry
                    args={[
                        mesh,
                        position,
                        helper.rotation,
                        new THREE.Vector3(dimensions[0], dimensions[1], 0.3),
                    ]}
                />
                <meshStandardMaterial
                    side={THREE.DoubleSide}
                    shininess={3}
                    map={activeDecal}
                    transparent={true}
                    anisotropy={16}
                    polygonOffset={true}
                    polygonOffsetUnits={-100}
                />
            </mesh>
        ),
        key: key,
    }
}
