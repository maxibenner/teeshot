import ControlPanel from "./components/controlPanel/ControlPanel"
import ButtonPhoto from "./components/buttonPhoto/ButtonPhoto"
import Viewer from "./components/three/Viewer"
import logo from "./assets/images/logo.png"
import "./globalStyles.css"
import useStore from "./states/modelState"


export default function App() {
    const { gl } = useStore()

    return (
        <div style={styles.wrapper}>
            <Viewer />
            <img src={logo} alt="Logo" style={styles.logo} />
            <ButtonPhoto gl={gl} style={styles.logo} />
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
