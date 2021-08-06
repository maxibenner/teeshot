import React from "react"
import { MdClose } from "react-icons/md"
import useStore from "../../states/modelState"
import s from "./decalManager.module.css"

const DecalManager = () => {
    const { decalImages, setDecalImages, removeDecal } = useStore()

    // REMOVE DECAL
    const handleRemove = (event) => {
        const key = event.target.dataset.key

        // Remove decal image
        const newArry = [...decalImages]
        const i = newArry.findIndex((el) => el.key == key) //eslint-disable-line
        newArry.splice(i, 1)
        setDecalImages(newArry)

        // Remove decal Mesh
        removeDecal(key)
    }

    return (
        <div className={s.imagesWrapper}>
            {decalImages.map((decal, i) => {
                return (
                    <div
                        key={decal.key}
                        className={s.imgContainerWrapper}
                        style={{
                            zIndex: decalImages.length - i,
                        }}
                    >
                        <div className={s.imgContainer}>
                            <img
                                className={s.img}
                                src={decal.path}
                                alt={"decal thumbnail"}
                            />
                        </div>
                        <div
                            className={s.closeBtn}
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
