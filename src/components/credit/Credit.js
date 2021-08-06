import React from "react"
import s from "./credit.module.css"
import { MdCameraAlt } from "react-icons/md"

const Credit = ({ name, link }) => {
    return (
        <div className={s.container} onClick={() => window.open(link)}>
            <div className={s.inner}>
                <MdCameraAlt />
                <p>{name}</p>
            </div>
        </div>
    )
}

export default Credit
