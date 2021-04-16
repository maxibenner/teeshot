import { useState } from "react"
import { MdCameraAlt } from "react-icons/md"

const PhotoButton = ({ gl }) => {
    const [hovered, setHovered] = useState(false)

    // Take screenshot
    const screenshot = () => {
        var strMime = "image/png"
        const imgData = gl.domElement.toDataURL(strMime, { pixelRatio: 4 })
        var a = document.createElement("a")

        a.setAttribute("download", "fotura.png")
        a.setAttribute("href", imgData)
        a.click()
    }

    // Style additions
    const innerMod = {
        ...styles.inner,
        background: hovered ? "rgb(250,250,250)" : "white",
    }

    return (
        <div
            onPointerOver={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onClick={screenshot}
            style={styles.wrapper}
        >
            <div style={innerMod}>
                <MdCameraAlt />
            </div>
        </div>
    )
}

export default PhotoButton

const styles = {
    wrapper: {
        position: "absolute",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "60px",
        height: "60px",
        borderRadius: "32px",
        border: "3px solid white",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inner: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.8rem",
        color: "rgb(230,230,230)",
        background: "white",
        width: "54px",
        height: "54px",
        borderRadius: "25px",
    },
}
