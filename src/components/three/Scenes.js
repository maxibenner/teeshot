import { invalidate, useFrame } from "@react-three/fiber"
import { Suspense } from "react"
import useStore from "../../states/modelState"
import LightsHarsh from "./LightsHarsh"
import ColorBg from "./sets/ColorBg"
import ImageBg from "./sets/ImageBg"
import ShapesBg from "./sets/ShapesBg"
import TextBg from "./sets/TextBg"

const Scenes = () => {
    const { backgroundColor, set, props } = useStore()
    const { animation } = useStore()

    useFrame(() => {
        if (animation) invalidate()
    })

    return (
        <>
            {set === "bg_color" && (
                <group>
                    <ColorBg backgroundColor={backgroundColor} />
                    <LightsHarsh />
                </group>
            )}
            {set === "bg_transparent" && (
                <group>
                    <LightsHarsh />
                </group>
            )}
            {set === "bg_image" && (
                <Suspense fallback={<LightsHarsh />}>
                    <ImageBg />
                    <LightsHarsh />
                </Suspense>
            )}
            {props === "prop_shapes" && (
                <ShapesBg backgroundColor={backgroundColor} />
            )}
            {props === "prop_text" && (
                <TextBg backgroundColor={backgroundColor} />
            )}
        </>
    )
}

export default Scenes
