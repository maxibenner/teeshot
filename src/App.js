import React from "react"
import styles from "./app.module.css"
import logo from "./assets/images/logo.png"
import CapturePanel from "./components/capturePanel/CapturePanel"
import ControlPanel from "./components/controlPanel/ControlPanel"
import Viewer from "./components/three/Viewer"
import NoteBox from "./components/noteBox/Notebox"
import "./globalStyles.css"

export default function App() {
    return (
        <>
            {!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            ) ? (
                <div className={styles.wrapper}>
                    <div className={styles.main}>
                        <Viewer />
                        <CapturePanel />
                    </div>
                    <div className={styles.controlPanelWrapper}>
                        <ControlPanel />
                    </div>
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
            {/*<img src={logo} alt="Logo" className={styles.logo} />*/}
            <h2 className={styles.logo}>Fotura</h2>
        </>
    )
}
