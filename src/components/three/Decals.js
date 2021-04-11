import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry";
import { changeDimensions } from "../../helpers/math";
extend({ DecalGeometry });

const Decals = ({ decals }) => {
    return <mesh>{decals.map((decal) => decal)};</mesh>;
};
export default Decals;

export const createDecal = (mesh, position, normal, activeDecal, maxSize) => {
    // INFO: This component works with a state array in the parent that holds the decal meshes.

    // Check for active decal
    if (!activeDecal) return window.alert("No decal selected");

    // INIT
    var helper = new THREE.Object3D(),
        eulerHelper = new THREE.Euler(0, 0, 0);

    // Texture settings
    activeDecal.anisotropy = 16;

    // Get texture size
    const dimensions = changeDimensions(activeDecal.image.width, activeDecal.image.height, maxSize);

    // ORIENTATION
    var n = normal.clone();
    n.add(position);

    helper.position.copy(position);
    helper.lookAt(n);

    // COUNTERACT ROTATION
    eulerHelper.setFromRotationMatrix(mesh.matrixWorld);

    // KEY
    const key = Math.floor(Math.random() * 999999);

    // Return decal
    return (
        <mesh
            key={key}
            name="decal"
            rotation={[
                eulerHelper.x * -1,
                eulerHelper.y * -1,
                eulerHelper.z * -1,
            ]}
        >
            <decalGeometry
                attach="geometry"
                args={[
                    mesh,
                    position,
                    helper.rotation,
                    new THREE.Vector3(dimensions[0], dimensions[1], 0.025),
                ]}
            />
            <meshPhongMaterial
                attach="material"
                side={THREE.DoubleSide}
                shininess={10}
                map={activeDecal}
                transparent={true}
                anisotropy={16}
                polygonOffset={true}
                polygonOffsetUnits={-100}
            />
        </mesh>
    );
};
