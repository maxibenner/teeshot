import { Suspense } from "react"
import PlainBg from "./sets/PlainBg"
import Lights from "./Lights"
import ShapesBg from "./sets/ShapesBg"
import EnvironmentBg from "./sets/EnvironmentBg"
import useStore from "../../states/modelState"

const Scenes = () => {
    const { backgroundColor, set } = useStore()
    return (
        <>
            {set == "TransparentBg" && (
                <group>
                    <Lights />
                </group>
            )}
            {set == "PlainBg" && (
                <group>
                    <PlainBg backgroundColor={backgroundColor} />
                    <Lights />
                </group>
            )}
            {set == "ShapesBg" && (
                <group>
                    <ShapesBg backgroundColor={backgroundColor} />
                    <Lights />
                </group>
            )}
            {set == "EnvironmentBg" && (
                <Suspense
                    fallback={
                        <>
                            <PlainBg backgroundColor={backgroundColor} />
                            <Lights />
                        </>
                    }
                >
                    <EnvironmentBg />
                </Suspense>
            )}
        </>
    )
}

export default Scenes
