import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import { a } from "react-spring/three";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Decals, { createDecal } from "./Decals";

const Model = ({
    url,
    rotation,
    activeDecalPath,
    setActiveDecalPath,
    decalSize,
    setModelRayData,
    setDecalSize,
}) => {
    console.log("model");
    // REF
    const modelRef = useRef();
    const { renderer } = useThree();
    useEffect(()=>{
        console.log(renderer)
    },[renderer])
    

    // STATE
    const [decals, setDecals] = useState([]);
    const [decalTexture, setDecalTexture] = useState();
    const initialDecalSize = useMemo(() => decalSize, []);

    // LOAD MODEL
    const gltf = useLoader(GLTFLoader, url);

    useEffect(() => {
        console.log(gltf);
    }, [gltf]);

    // LOAD DECAL TEXTURE
    useEffect(() => {
        if (activeDecalPath) {
            const decalTexture = new THREE.TextureLoader().load(
                activeDecalPath,
                () => setDecalTexture(decalTexture)
            );
        } else {
            setDecalTexture(null);
        }
    }, [activeDecalPath]);

    // ADD DECAL TO ARRAY
    const addDecal = (e, modelRef, decalTexture, decalSize) => {
        // Check for active decal
        const decal = createDecal(
            modelRef.current, // Geometry
            e.intersections[0].point, // Position
            modelRef.current.localToWorld(e.intersections[0].face.normal), // Normal
            decalTexture, // Texture
            decalSize // Size of longest side
        );

        // Add decal to state
        setDecals((prev) => [...prev, decal]);

        // Remove decal for one time use
        setActiveDecalPath(null);

        // Reset decal size
        setDecalSize(initialDecalSize);
    };

    // PASS RAYCAST
    const passRaycast = (e, modelRef) => {
        // Check if pointer is on top of mesh
        if (e) {
            // Get position
            const posV = e.point.clone();

            // Get world normal
            const n = e.face.normal.clone();
            const nWorld = modelRef.current.localToWorld(n);

            // Set pos and normal
            setModelRayData({ position: posV, normalWorld: nWorld });
        } else {
            // Reset pos and normal
            setModelRayData(null);
        }
    };

    return (
        <a.group rotation={rotation} castShadow>
            <mesh
                ref={modelRef}
                onPointerMove={(e) => passRaycast(e, modelRef)}
                onPointerOut={() => passRaycast(null)}
                onPointerDown={(e) =>
                    addDecal(e, modelRef, decalTexture, decalSize)
                }
                name="model"
                geometry={gltf.scene.children[0].geometry}
                //geometry={new THREE.SphereBufferGeometry(0.3, 20, 20)}
                castShadow
            >
                <meshStandardMaterial color="white" />
            </mesh>
            <Decals decals={decals} />
        </a.group>
    );
};

export default Model;
