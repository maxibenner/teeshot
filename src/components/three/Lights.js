import React from "react";

const Lights = () => {
	return (
		<>
			<ambientLight intensity={0.4} />
			<directionalLight castShadow position={[.5, .3, 1]} intensity={.9} />
			<directionalLight castShadow position={[.3, 1, -1]} intensity={1.5} />
			<pointLight position={[0, 50, 0]} intensity={1.5} />
		</>
	);
};

export default Lights;
