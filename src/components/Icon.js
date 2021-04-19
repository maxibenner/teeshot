export default function Icon({ imgSrc, imgAlt, textContent, onClick }) {
    return (
        <div style={styles.wrapper} onClick={onClick}>
            <img style={styles.img} src={imgSrc} alt={imgAlt} />
            {textContent && <p style={styles.text}>{textContent}</p>}
        </div>
    )
}

const styles = {
    img: {
        width: "38px",
        height: "38px",
    },
    text: {
        color: "grey",
        margin: "0 10px",
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
        margin: "5px 5px 5px 0",
        width: "40px",
        height: "40px",
        border: "1px solid lightGrey",
        borderRadius: "5px",
        boxSizing: "border-box",
        cursor: "pointer",
        overflow: "hidden"
    },
}
