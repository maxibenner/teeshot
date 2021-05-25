import React from "react"
import s from "./credit.module.css"
import { MdCameraAlt } from "react-icons/md"

const Credit = ({ name, link }) => {
    console.log(name, link)
    const handleClick = () => {
        window.location.href = link
    }
    return (
        <div className={s.container} onClick={handleClick}>
            <div className={s.inner}>
                <MdCameraAlt />
                <p>{name}</p>
            </div>
        </div>
    )
}

export default Credit
