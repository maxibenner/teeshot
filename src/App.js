import React from "react"
import "./globalStyles.css"
import MobileNote from "./pages/mobileNote/MobileNote"
import Studio from "./pages/studio/Studio"

export default function App() {
    const mobile =
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )
    return <>{mobile ? <Studio /> : <MobileNote />}</>
}
