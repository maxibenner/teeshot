const Button = ({ onClick, children }) => {
    return (
        <div onClick={onClick} style={style}>
            {children}
        </div>
    )
}

const style = {
    width: "100%",
    height: "40px",
    fontWeight: "bold",
    background: "linear-gradient(to right, #7474BF 0%, #348AC7 100%",
    color: "white",
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"

}

export default Button
