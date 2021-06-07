import React, { useState } from "react"
import s from "./canvasSizer.module.css"
import useStore from "../../states/modelState"
import { useEffect } from "react"

const CanvasSizer = ({ children }) => {
    const { canvasSize, setCanvasSize } = useStore()
    const [dimensions, setDimensions] = useState({ width: 1080, height: 1080 })
    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        setOpacity(0)
        if (canvasSize.width > canvasSize.height) {
            let height = (600 / canvasSize.width) * canvasSize.height
            setDimensions({ width: 600, height: height })
        } else if (canvasSize.height > canvasSize.width) {
            let width = (600 / canvasSize.height) * canvasSize.width
            setDimensions({ width: width, height: 600 })
        } else if ((canvasSize.width = canvasSize.height)) {
            setDimensions({ width: 600, height: 600 })
        }
        setTimeout(() => setOpacity(1), 300)
    }, [canvasSize])

    useEffect(() => {
        setCanvasSize({ name: "Instagram Square", width: 1080, height: 1080 })
    }, [])

    return (
        <div
            className={s.wrapper}
            style={{
                gridTemplateColumns: `auto ${dimensions.width}px auto`,
                opacity: opacity,
            }}
        >
            <div className={s.bar} />
            <div className={s.sizer}>{children}</div>
            <div className={s.bar} />
        </div>
    )
}
export default CanvasSizer
