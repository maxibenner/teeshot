import { useRef } from "react"
const ColorPicker = ({ title, color, setColor }) => {
    const inputRef = useRef()
    return (
        <>
            <div style={styles.wrapper}>
                <input
                    ref={inputRef}
                    type="color"
                    value={color}
                    onInput={() => setColor(inputRef.current.value)}
                    style={{
                        width: "40px",
                        height: "40px",
                        border: "1px solid lightGrey",
                        borderRadius: "5px",
                        background: color,
                        boxSizing: "border-box",
                        cursor: "pointer",
                    }}
                />
                <p style={styles.text}>{title}</p>
            </div>
        </>
    )
}

export default ColorPicker

const styles = {
    text: {
        color: "grey",
        margin: "0 10px",
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
        margin: "5px 0",
    },
}
