import React from "react"
import s from "./divider.module.css"

const Divider = ({ text, ...rest }) => {
    return (
        <div className={text ? s.container_w_text : s.container} {...rest}>
            <div className={s.line}></div>
            {text && <p className={s.text}>{text}</p>}
            <div className={s.line}></div>
        </div>
    )
}

export default Divider
