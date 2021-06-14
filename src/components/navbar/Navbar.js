import React from "react"
import s from "./navbar.module.css"
import { Link } from "react-router-dom"

const Navbar = ({ children, absolute }) => {
    return (
        <div className={`${s.wrapper} ${absolute && s.absolute}`}>
            <Link
                to="/"
                className={s.homeLink}
            >
                <h2 className={s.logo}>Merch</h2>
            </Link>
            <nav className={s.menuContainer}>{children}</nav>
        </div>
    )
}

export default Navbar
