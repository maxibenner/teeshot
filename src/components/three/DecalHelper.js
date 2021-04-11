import { invalidate, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { changeDimensions } from "../../helpers/math";

var quaternion = new THREE.Quaternion(),
    vector = new THREE.Vector3(0, 0, 1);

const DecalHelper = ({ modelRayData, activeDecalPath, size, rotation }) => {
    const [decalTexture, setDecalTexture] = useState(null);
    const [decalDimensions, setdecalDimensions] = useState([0, 0]);
    const [decalScale, setDecalScale] = useState(1);
    const initialDecalSize = useMemo(() => size, []);
    console.log("DecalHelper")

    const meshRef = useRef();

    // Match decal scale to new dimensions
    useEffect(() => {
        const newScale = size / initialDecalSize;
        setDecalScale(newScale);
    }, [size]);

    // Change rotation
    useEffect(() => {
        // Trigger render
        invalidate();
    }, [rotation]);

    // LOAD TEXTURE + SET DIMENSIONS
    useEffect(() => {
        if (activeDecalPath) {
            const decalTexture = new THREE.TextureLoader().load(
                activeDecalPath,
                () => {
                    setDecalTexture(decalTexture);
                    const newDimensions = changeDimensions(
                        decalTexture.image.width,
                        decalTexture.image.height,
                        size
                    );
                    setdecalDimensions(newDimensions);
                }
            );
        } else {
            setDecalTexture(null);
        }
    }, [activeDecalPath]);

    // SET HEIGHT + ORIENTATION
    useEffect(() => {
        if (meshRef.current && modelRayData) {
            meshRef.current.position.set(
                modelRayData.position.x,
                modelRayData.position.y,
                modelRayData.position.z
            );
            quaternion.setFromUnitVectors(vector, modelRayData.normalWorld);
            meshRef.current.setRotationFromQuaternion(quaternion);
            meshRef.current.rotation.z = rotation;

            // Trigger render
            invalidate();
        }
    }, [modelRayData]);

    // SET POSITION
    const { viewport } = useThree();
    useFrame(({ mouse }) => {
        if (meshRef.current && !modelRayData) {
            const x = (mouse.x * viewport.width) / 2;
            const y = (mouse.y * viewport.height) / 2;
            meshRef.current.position.set(x, y, 0);
            meshRef.current.rotation.set(0, 0, rotation);

            // Trigger render
            invalidate();
        }
    });

    return decalTexture ? (
        <mesh ref={meshRef} castShadow scale={decalScale}>
            <planeBufferGeometry args={decalDimensions} />
            <meshStandardMaterial
                depthTest={modelRayData ? false : true}
                map={decalTexture}
                transparent={true}
                anisotropy={16}
            />
        </mesh>
    ) : null;
};

export default DecalHelper;
