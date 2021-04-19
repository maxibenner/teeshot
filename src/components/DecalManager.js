import React from "react"
import Card from "./Card"
import useStore from "../states/modelState"
import { MdClose } from "react-icons/md"

const DecalManager = () => {
    const { decalImages, setDecalImages, removeDecal } = useStore()

    // REMOVE DECAL
    const handleRemove = (event) => {
        const key = event.target.dataset.key
        console.log(event)

        // Remove decal image
        const newArry = [...decalImages]
        const i = newArry.findIndex((el) => el.key === key)
        newArry.splice(i, 1)
        setDecalImages(newArry)

        // Remove decal Mesh
        removeDecal(key)
    }

    return (
        <div style={styles.wrapper}>
            <Card title="Decals">
                <div style={styles.imagesWrapper}>
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
                                <div style={styles.imgContainer}>
                                    <img style={styles.img} src={decal.path} alt={"decal thumbnail"} />
                                </div>
                                <div
                                    style={styles.closeBtn}
                                    onClick={handleRemove}
                                    data-key={decal.key}
                                >
                                    <MdClose style={{pointerEvents: "none"}} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>
        </div>
    )
}

const styles = {
    wrapper: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "230px",
        margin: "20px",
    },
    imagesWrapper: {
        display: "flex",
        flexDirection: "row",
        margin: "0 -5px",
        overflow: "scroll",
        paddingTop: "5px"
    },
    imgContainer: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        maxWidth: "40px",
        maxHeight: "40px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.17)",
        overflow: "hidden",
        margin: "5px",
        borderRadius: "5px",
    },
    img: {
        maxHeight: "40px",
        margin: "0 auto",
    },
    closeBtn: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: ".8rem",
        background: "white",
        borderRadius: "8px",
        width: "15px",
        height: "15px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.17)",
        top: "-5px",
        right: "-5px",
        cursor: "pointer",
    },
}

export default DecalManager
