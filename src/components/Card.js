const Card = ({ title, flex, children, invisible }) => {
    return (
        <div style={!invisible ? styles.card : styles.cardInvisible}>
            {title && <h3 style={styles.h3}>{title}</h3>}
            <div
                style={{
                    display: flex ? "flex" : "block",
                    boxSizing: "border-box",
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default Card

const styles = {
    card: {
        overflow: "hidden",
        background: "white",
        padding: "10px",
        borderRadius: "7px",
        margin: "14px",
    },
    cardInvisible: {
        overflow: "hidden",
        borderRadius: "7px",
        margin: "14px",
    },
    h3: {
        margin: "5px 0",
        color: "grey",
    },
}
