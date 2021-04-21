import { useRef } from "react"

const InputText = ({ onChange, placeholder, maxLength }) => {
    const ref = useRef()
    const handleChange = () => onChange(ref.current.value)
    return (
        <>
            <input
                ref={ref}
                placeholder={placeholder}
                onChange={handleChange}
                type="text"
                style={styles.input}
                maxLength={maxLength}
            />
            <label style={styles.label}>Background Text</label>
        </>
    )
}

export default InputText

const styles = {
    input: {
        boxSizing: "border-box",
        borderRadius: "5px",
        border: "1px solid lightGrey",
        boxShadow: "none",
        width: "100%",
        height: "40px",
        fontSize: "1rem",
        padding: "0 7px",
    },
    label: {
        fontSize: ".8rem",
        color: "grey",
    },
}
