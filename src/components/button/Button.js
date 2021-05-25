import styles from "./button.module.css"

const Button = ({ onClick, children, ghost }) => {
    return (
        <div
            onClick={onClick}
            className={ghost ? styles.container_ghost : styles.container}
        >
            {children}
        </div>
    )
}

export default Button
