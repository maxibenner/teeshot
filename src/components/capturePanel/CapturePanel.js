import { useState } from "react"
import { MdPhotoCamera } from "react-icons/md"
import { FaVideo } from "react-icons/fa"
import styles from "./capturePanel.module.css"
import useRecorder from "../../helpers/useRecorder"
import useStore from "../../states/modelState"

const CapturePanel = () => {
    const [mode, setMode] = useState("photo")
    const { gl } = useStore()
    const recorder = useRecorder(gl?.domElement)

    // Take screenshot
    const screenshot = () => {
        const imgData = gl.domElement.toDataURL("image/png")
        var a = document.createElement("a")

        a.setAttribute("download", "fotura.png")
        a.setAttribute("href", imgData)
        a.click()
    }

    // Record video
    const video = () => {
        recorder.capture(4)
    }

    // Change capture mode
    const handleMode = () => {
        if (mode === "photo") setMode("video")
        else setMode("photo")
    }

    return (
        <div className={styles.wrapper}>
            <div
                id="capture-button"
                onClick={mode === "photo" ? screenshot : video}
                className={styles.container}
            >
                <div
                    className={
                        mode === "photo"
                            ? styles.capture_inner_photo
                            : styles.capture_inner_video
                    }
                />
            </div>
            <div className={styles.mode_switch} onClick={handleMode}>
                {mode !== "photo" ? <MdPhotoCamera /> : <FaVideo />}
            </div>
        </div>
    )
}

export default CapturePanel
