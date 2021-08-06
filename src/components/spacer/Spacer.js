import React from "react"

const Spacer = ({ size, orientation }) => {
    const dimension = orientation === "vertical" ? "width" : "height"

    return <div style={{ [dimension]: `${size}px` }} />
}

export default Spacer
