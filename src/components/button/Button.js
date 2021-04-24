import styles from "./button.module.css"

const Button = ({ onClick, children }) => {
    return (
        <div onClick={onClick} className={styles.container}>
            {children}
        </div>
    )
}

export default Button
