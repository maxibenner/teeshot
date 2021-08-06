import ControlPanel from "./components/controlPanel/ControlPanel"
import CapturePanel from "./components/capturePanel/CapturePanel"
import Viewer from "./components/three/Viewer"
import logo from "./assets/images/logo.png"
import "./globalStyles.css"

export default function App() {
    return (
        <div style={styles.wrapper}>
            <Viewer />
            <img src={logo} alt="Logo" style={styles.logo} />
            <CapturePanel />
            <ControlPanel />
        </div>
    )
}

const styles = {
    wrapper: {
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
        background: "black",
        top: 0,
    },
    logo: {
        position: "absolute",
        top: 0,
        width: "120px",
        margin: "30px",
    },
}
