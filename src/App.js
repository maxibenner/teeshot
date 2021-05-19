import React from "react"
import styles from "./app.module.css"
import logo from "./assets/images/logo.png"
import CapturePanel from "./components/capturePanel/CapturePanel"
import ControlPanel from "./components/controlPanel/ControlPanel"
import Viewer from "./components/three/Viewer"
import NoteBox from "./components/noteBox/Notebox"
import "./globalStyles.css"

export default function App() {
    // Listen to window resize
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    React.useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth)
        }
        const resizeListener = window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", resizeListener)
        }
    }, [])

    return (
        <>
            {windowWidth >= 600 ? (
                <div className={styles.wrapper}>
                    <Viewer />
                    <CapturePanel />
                    <ControlPanel />
                </div>
            ) : (
                <div className={styles.noteBoxWrapper}>
                    <NoteBox>
                        <p>
                            👨🏻‍💻 Limited experience on mobile devices, switch to a
                            desktop device to start creating!
                        </p>
                    </NoteBox>
                </div>
            )}
            <img src={logo} alt="Logo" className={styles.logo} />
        </>
    )
}
