import React from "react"
import styles from "./noteBox.module.css"

const Notebox = ({ children }) => {
    return <div className={styles.container}>{children}</div>
}

export default Notebox
