import useStore from "../../states/modelState"

const CanvasBackground = ({ children }) => {
    const { canvasBackground } = useStore()

    const styles = {
        height: "100%",
        backgroundImage: canvasBackground
            ? `url(${canvasBackground})`
            : "linear-gradient(45deg, rgb(220,220,220) 25%, transparent 25%), linear-gradient(-45deg, rgb(220,220,220) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgb(220,220,220) 75%), linear-gradient(-45deg, transparent 75%, rgb(220,220,220) 75%)",
        backgroundSize: canvasBackground ? "cover" : "20px 20px",
        backgroundPosition: canvasBackground
            ? "center"
            : "0 0, 0 10px, 10px -10px, -10px 0px",
    }

    return <div style={styles}>{children}</div>
}

export default CanvasBackground
