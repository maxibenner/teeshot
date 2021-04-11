import Viewer from "./components/three/Viewer";
import "./globalStyles.css";

export default function App() {
    return (
        <div style={styles.wrapper}>
            <Viewer />
        </div>
    );
}

const styles = {
    wrapper: {
        width: "100%",
        height: "100vh",
        padding: "7px",
        boxSizing: "border-box",
    },
};
