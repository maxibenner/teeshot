import React from "react"
import PlainBg from "./sets/PlainBg"
import Lights from "./Lights"
import ShapesBg from "./sets/ShapesBg"
import useStore from "../../states/modelState"

const Scenes = () => {
    const { backgroundColor, set } = useStore()
    return (
        <>
            {set == "PlainBg" && <group>
                <PlainBg backgroundColor={backgroundColor} />
                <Lights />
            </group>}
            {set == "ShapesBg" && <group>
                <ShapesBg backgroundColor={backgroundColor} />
                <Lights />
            </group>}
        </>
    )
}

export default Scenes
