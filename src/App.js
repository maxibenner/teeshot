import ControlPanel from "./components/controlPanel/ControlPanel"
import CapturePanel from "./components/capturePanel/CapturePanel"
import Viewer from "./components/three/Viewer"
import logo from "./assets/images/logo.png"
import styles from "./app.module.css"
import "./globalStyles.css"

export default function App() {
    return (
        <div className={styles.wrapper}>
            <Viewer/>
            <img src={logo} alt="Logo" className={styles.logo} />
            <CapturePanel />
            <ControlPanel />
        </div>
    )
}