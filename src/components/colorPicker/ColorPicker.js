import { useState } from "react"
import s from "./colorPicker.module.css"
import { HexColorPicker } from "react-colorful"

const ColorPicker = ({ title, color, setColor }) => {
    const [active, setActive] = useState(false)
    const handleClick = () => {
        setActive((state) => !state)
    }
    return (
        <>
            <div className={s.wrapper}>
                <div
                    className={s.color}
                    style={{ background: color }}
                    onClick={handleClick}
                />
                <p className={s.text}>{title}</p>
            </div>
            {active && (
                <HexColorPicker
                    style={{
                        marginTop: "10px",
                        width: "100%",
                        height: "150px",
                    }}
                    color={color}
                    onChange={setColor}
                />
            )}
        </>
    )
}

export default ColorPicker
