import styles from "./button.module.css"

const Button = ({ onClick, children, inactive }) => {
    return (
        <div
            onClick={!inactive && onClick}
            className={inactive ? styles.container_inactive : styles.container}
        >
            {children}
        </div>
    )
}

export default Button
