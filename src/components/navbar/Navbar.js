import React from "react"
import s from "./navbar.module.css"
import { Link } from "react-router-dom"

const Navbar = ({ children, absolute }) => {
    return (
        <div className={`${s.wrapper} ${absolute && s.absolute}`}>
            <div className={s.homeLink}>
                <h2 className={s.logo}>Teeshot</h2>
            </div>
            <nav className={s.menuContainer}>{children}</nav>
        </div>
    )
}

export default Navbar
