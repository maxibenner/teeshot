import ControlPanel from "./components/controlPanel/ControlPanel"
import ButtonPhoto from "./components/buttonPhoto/ButtonPhoto"
import Viewer from "./components/three/Viewer"
import logo from "./assets/images/logo.png"
import "./globalStyles.css"
import useStore from "./states/modelState"
import useRecorder from "./helpers/useRecorder"

export default function App() {
    const { gl } = useStore()
    const recorder = useRecorder(gl?.domElement)

    const handleStart = () => recorder.capture(2)

    return (
        <div style={styles.wrapper}>
            <Viewer />
            <img src={logo} alt="Logo" style={styles.logo} />
            <ButtonPhoto gl={gl} style={styles.logo} />
            <ControlPanel />
            {/*<div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "50px",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <button onClick={handleStart}>Start</button>
            </div>*/}
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
