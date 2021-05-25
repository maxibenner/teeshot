
const ColorBg = ({backgroundColor}) => {
	return (
		<mesh position={[0, 0, -.3]} receiveShadow>
			<planeBufferGeometry args={[100, 100]} />
			<meshStandardMaterial color={backgroundColor} />
		</mesh>
	);
};

export default ColorBg;
