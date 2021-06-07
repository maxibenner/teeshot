import s from "./dropdown.module.css"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useState, useEffect } from "react"

const Dropdown = ({ children, title, style }) => {
    const [open, setOpen] = useState(false)

    //Set click listener
    useEffect(() => {
        if (open === false) return

        // Add outside click listener
        open && document.addEventListener("click", closeMenu)

        return () => {
            document.removeEventListener("click", closeMenu)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    // Open and close dropdown
    const closeMenu = () => {
        setOpen(false)
    }

    return (
        <div
            className={s.wrapper}
            style={style}
            onClick={() => setOpen((state) => !state)}
        >
            <div className={s.button}>
                <p>{title}</p>
                <MdKeyboardArrowDown
                    className={s.icon}
                    style={{
                        transform: open ? "rotate(0deg)" : "rotate(180deg)",
                    }}
                />
            </div>
            {open && (
                <div className={s.container}>
                    <div className={s.item_container}>{children}</div>
                    <div className={s.triangle} />
                </div>
            )}
        </div>
    )
}

export default Dropdown
