const Card = ({ title, flex, children }) => {
    return (
        <div style={styles.card}>
            {title && <h3 style={styles.h3}>{title}</h3>}
            <div style={{ display: flex ? "flex" : "block", boxSizing: "border-box", }}>{children}</div>
        </div>
    )
}

export default Card

const styles = {
    card: {
        overflow: "hidden",
        background: "white",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.17)",
        padding: "10px",
        borderRadius: "7px",
        margin: "14px",
        width: "100%",
        boxSizing: "border-box",
    },
    h3: {
        margin: "5px 0",
        color: "grey",
    },
}
