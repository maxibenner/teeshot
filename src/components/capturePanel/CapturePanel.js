import { FaVideo } from "react-icons/fa"
import { MdPhotoCamera } from "react-icons/md"
import useStore from "../../states/modelState"
import useRecorderStore from "../../states/recorderState"
import Dropdown from "../../components/dropdown/Dropdown"
import styles from "./capturePanel.module.css"

const CapturePanel = () => {
    const { gl, set, setSet, setCanvasSize, canvasSize } = useStore()
    const { active, setActive, progress, mode, setMode } = useRecorderStore()

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
        if (!active) {
            if (mode === "photo") {
                setMode("video")
                if (set === "bg_transparent") {
                    setSet("bg_color")
                }
            } else setMode("photo")
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div>
                    {progress === 100 && (
                        <div className={styles.processing_flag}>
                            <p className={styles.processing_flag_inner}>
                                Processing...
                            </p>
                        </div>
                    )}
                </div>

                <div className={styles.buttons}>
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
                            className={styles.capture_indicator}
                            style={{
                                strokeDashoffset:
                                    progress === 0
                                        ? 204
                                        : (100 - progress) * 2.04,
                            }}
                        />
                        <circle
                            cx="34"
                            cy="34"
                            r="30"
                            className={styles.capture_fill}
                            fill={
                                mode === "photo" ? "white" : "rgb(255, 61, 61)"
                            }
                        />
                    </svg>
                    <div
                        className={
                            active
                                ? styles.mode_switch_inactive
                                : styles.mode_switch
                        }
                        onClick={handleMode}
                    >
                        {mode !== "photo" ? <MdPhotoCamera /> : <FaVideo />}
                    </div>
                </div>
                <div className={styles.dropdown_container}>
                    <Dropdown
                        title={canvasSize.name}
                        style={{ pointerEvents: active ? "none" : "all" }}
                    >
                        {require("../../constants/image_sizes.json").map(
                            (format) => {
                                return (
                                    <p
                                        className={styles.dropdown_item}
                                        data_id={format.name}
                                        key={format.name}
                                        style={{
                                            background:
                                                canvasSize.name === format.name &&
                                                "rgb(238, 238, 238)",
                                        }}
                                        onClick={() =>
                                            setCanvasSize({
                                                name: format.name,
                                                width: format.size.width,
                                                height: format.size.height,
                                            })
                                        }
                                    >
                                        {format.name}
                                    </p>
                                )
                            }
                        )}
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default CapturePanel
