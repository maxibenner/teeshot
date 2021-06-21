import styles from "./canvasBackground.module.css"
import useStore from "../../../states/modelState"
const CanvasBackground = ({ children }) => {
    const { loadingFinished } = useStore()
    return (
        <div className={styles.white_backgdrop}>
            <div className={styles.inner}>{children}</div>
            {!loadingFinished && (
                <img
                    className={styles.placeholder}
                    src="/images/placeholder.jpg"
                />
            )}
        </div>
    )
}

export default CanvasBackground
