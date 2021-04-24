import React, { useEffect } from "react"
import useStore from "../../states/modelState"
import { MdClose } from "react-icons/md"
import s from "./decalManager.module.css"

const DecalManager = () => {
    const { decalImages, setDecalImages, removeDecal, decals } = useStore()

    // REMOVE DECAL
    const handleRemove = (event) => {
        const key = event.target.dataset.key
        //console.log(event)

        // Remove decal image
        const newArry = [...decalImages]
        const i = newArry.findIndex((el) => el.key == key)
        console.log(i)
        newArry.splice(i, 1)
        setDecalImages(newArry)

        // Remove decal Mesh
        removeDecal(key)
        console.log(key)
    }

    useEffect(() => {
        console.log(decals)
    }, [decals])

    return (
        <div style={s.imagesWrapper}>
            {decalImages.map((decal, i) => {
                return (
                    <div
                        key={decal.key}
                        style={{
                            position: "relative",
                            boxSizing: "border-box",
                            zIndex: decalImages.length - i,
                        }}
                    >
                        <div style={s.imgContainer}>
                            <img
                                style={s.img}
                                src={decal.path}
                                alt={"decal thumbnail"}
                            />
                        </div>
                        <div
                            style={s.closeBtn}
                            onClick={handleRemove}
                            data-key={decal.key}
                        >
                            <MdClose style={{ pointerEvents: "none" }} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default DecalManager
