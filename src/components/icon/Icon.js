import s from "./icon.module.css"
import { useState } from "react"

export default function Icon({
    imgSrc,
    imgAlt,
    textContent,
    onClick,
    ...rest
}) {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        // External
        onClick()

        // Internal styles
        //setClicked(prev => !prev)
    }

    return (
        <div
            onClick={handleClick}
            className={s.wrapper}
            style={{
                backgroundImage: `url(${imgSrc})`,
            }}
            {...rest}
        >
            {textContent && <p className={s.text}>{textContent}</p>}
        </div>
    )
}
