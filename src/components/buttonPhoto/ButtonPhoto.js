import { useState } from "react"
import { MdCameraAlt } from "react-icons/md"
import styles from "./buttonPhoto.module.css"

const ButtonPhoto = ({ gl }) => {
    const [hovered, setHovered] = useState(false)

    // Take screenshot
    const screenshot = () => {
        const imgData = gl.domElement.toDataURL("image/png")
        var a = document.createElement("a")

        a.setAttribute("download", "fotura.png")
        a.setAttribute("href", imgData)
        a.click()
    }

    return (
        <div className={styles.wrapper}>
            <div
                id="take-photo-button"
                onPointerOver={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                onClick={screenshot}
                className={styles.container}
            >
                <div className={styles.inner}>
                    <MdCameraAlt />
                </div>
            </div>
        </div>
    )
}

export default ButtonPhoto
