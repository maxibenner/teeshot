const PlainBg = ({backgroundColor}) => {
	return (
		<mesh position={[0, 0, -.5]} receiveShadow>
			<planeBufferGeometry args={[100, 100]} />
			<meshStandardMaterial color={backgroundColor} />
		</mesh>
	);
};

export default PlainBg;
