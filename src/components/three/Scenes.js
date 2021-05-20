import { Suspense } from "react"
import PlainBg from "./sets/PlainBg"
import Lights from "./Lights"
import ShapesBg from "./sets/ShapesBg"
import EnvironmentBg from "./sets/EnvironmentBg"
import TextBg from "./sets/TextBg"
import useStore from "../../states/modelState"
import { invalidate, useFrame } from "@react-three/fiber"

const Scenes = () => {
    const { backgroundColor, set } = useStore()
    const { animation } = useStore()

    useFrame(() => {
        if (animation) invalidate()
    })

    return (
        <>
            {set === "bg_transparent" && (
                <group>
                    <Lights />
                </group>
            )}
            {set === "bg_plain" && (
                <group>
                    <PlainBg backgroundColor={backgroundColor} />
                    <Lights />
                </group>
            )}
            {set === "bg_shapes" && (
                <group>
                    <ShapesBg backgroundColor={backgroundColor} />
                    <Lights />
                </group>
            )}
            {set === "bg_environment" && (
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
            {set === "bg_text" && (
                <group>
                    <TextBg backgroundColor={backgroundColor} />
                    <Lights />
                </group>
            )}
        </>
    )
}

export default Scenes
