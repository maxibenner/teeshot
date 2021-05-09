import { useState, useEffect } from "react"
import { MdPhotoCamera } from "react-icons/md"
import { FaVideo } from "react-icons/fa"
import styles from "./capturePanel.module.css"
//import useRecorder from "../../helpers/useRecorder"
import useStore from "../../states/modelState"
import useRecorderStore from "../../states/recorderState"

const CapturePanel = () => {
    const [mode, setMode] = useState("photo")
    const { gl } = useStore()
    const { active, setActive } = useRecorderStore()

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
        setActive(true)
    }

    // Change capture mode
    const handleMode = () => {
        if (mode === "photo") setMode("video")
        else setMode("photo")
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <svg
                    id="capture-button"
                    onClick={mode === "photo" ? screenshot : video}
                    className={styles.svg}
                >
                    <circle
                        cx="34"
                        cy="34"
                        r="33.5"
                        className={styles.capture_outline}
                    />
                    <circle
                        cx="34"
                        cy="34"
                        r="32.5"
                        className={
                            active
                                ? styles.capture_indicator_animate
                                : styles.capture_indicator
                        }
                    />
                    <circle
                        cx="34"
                        cy="34"
                        r="30"
                        className={styles.capture_fill}
                        fill={mode === "photo" ? "white" : "rgb(255, 61, 61)"}
                    />
                </svg>
                <div className={styles.mode_switch} onClick={handleMode}>
                    {mode !== "photo" ? <MdPhotoCamera /> : <FaVideo />}
                </div>
            </div>
        </div>
    )
}

export default CapturePanel
