import { useRef, useEffect } from "react";
import * as THREE from "three";

var quaternion = new THREE.Quaternion(),
	vector = new THREE.Vector3(0, 0, 1);

const MouseHelper = ({ intersection }) => {
	// NEEDS: { position: VECTOR3, normal: VECTOR3 }

	const meshRef = useRef();

	// Rotate helper mesh
	useEffect(() => {
		if (meshRef.current && intersection.normalWorld) {
			quaternion.setFromUnitVectors(vector, intersection.normalWorld);
			meshRef.current.setRotationFromQuaternion(quaternion);
			meshRef.current.rotation.z = 0;
		}
	}, [intersection.position]);

	return (
		<mesh ref={meshRef} position={intersection.position}>
			<planeBufferGeometry args={[0.09, 0.09]} attach="geometry" />
			<meshStandardMaterial attach="material" color="red" />
		</mesh>
	);
};

export default MouseHelper;
