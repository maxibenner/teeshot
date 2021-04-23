import ControlPanel from "./components/ControlPanel"
import PhotoButton from "./components/PhotoButton"
import Viewer from "./components/three/Viewer"
import logo from "./assets/images/logo.png"
import "./globalStyles.css"
import useStore from "./states/modelState"
import TagManager from "react-gtm-module"

const tagManagerArgs = {
    gtmId: "GTM-M4HNGJT",
}

TagManager.initialize(tagManagerArgs)

export default function App() {
    const { gl } = useStore()
    return (
        <div style={styles.wrapper}>
            <Viewer />
            <img src={logo} alt="Logo" style={styles.logo} />
            <PhotoButton gl={gl} style={styles.logo} />
            <ControlPanel />
        </div>
    )
}

const styles = {
    wrapper: {
        width: "100%",
        height: "100vh",
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
