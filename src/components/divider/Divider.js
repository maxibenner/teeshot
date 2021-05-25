import React from "react"
import s from "./divider.module.css"

const Divider = ({ ...rest }) => {
    return <div className={s.container} {...rest} />
}

export default Divider
