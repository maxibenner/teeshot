import { useRef } from "react"
import s from "./colorPicker.module.css"

const ColorPicker = ({ title, color, setColor }) => {
    const inputRef = useRef()
    return (
        <>
            <div className={s.wrapper}>
                <input
                    ref={inputRef}
                    type="color"
                    value={color}
                    onInput={() => setColor(inputRef.current.value)}
                    className={s.input}
                />
                <p className={s.text}>{title}</p>
            </div>
        </>
    )
}

export default ColorPicker
