export default function IconWithText({ imgSrc, imgAlt, textContent, onClick }) {
    return (
        <div style={styles.wrapper} onClick={onClick}>
            <img style={styles.img} src={imgSrc} alt={imgAlt} />
            {textContent && <p style={styles.text}>{textContent}</p>}
        </div>
    )
}

const styles = {
    img: {
        maxWidth: "40px",
    },
    text: {
        color: "grey",
        margin: "0 10px",
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
        margin: "5px 0",
    },
}
