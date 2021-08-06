import React from "react"
import styles from "./container.module.css"

const Container = ({ title, children }) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{title}</h1>
            {children}
        </div>
    )
}

export default Container
