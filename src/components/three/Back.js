const Back = () => {
	return (
		<mesh position={[0, 0, -.5]} receiveShadow>
			<planeBufferGeometry attach="geometry" args={[100, 100]} />
			<meshStandardMaterial attach="material" color="white" />
		</mesh>
	);
};

export default Back;
