const Banner = () => {
    return (
        <div style={styles.wrapper}>
            <p>We are just getting started. Leave your email to always know first when we add new features! 🔥 </p>
        </div>
    )
}
export default Banner

const styles = {
    wrapper: {
        boxSizing: "border-box",
        padding: "0 50px",
        position: "absolute",
        width: "100%",
        top: 0,
        background: "white",
    }
}