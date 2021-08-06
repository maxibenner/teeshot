import React, { useState } from "react"
import s from "./canvasSizer.module.css"
import useStore from "../../states/modelState"
import { useEffect } from "react"

const CanvasSizer = ({ children }) => {
    const { canvasSize } = useStore()
    const [dimensions, setDimensions] = useState({ width: 600, height: 600 })

    useEffect(() => {
        if (canvasSize.width > canvasSize.height) {
            let height = (600 / canvasSize.width) * canvasSize.height
            setDimensions({ width: 600, height: height })
        } else if (canvasSize.height > canvasSize.width) {
            let width = (600 / canvasSize.height) * canvasSize.width
            setDimensions({ width: width, height: 600 })
        } else if ((canvasSize.width = canvasSize.height)) {
            setDimensions({ width: 600, height: 600 })
        }
    }, [canvasSize])

    return (
        <div
            className={s.wrapper}
            style={{
                gridTemplateColumns: `auto ${dimensions.width}px auto`,
            }}
        >
            <div className={s.bar} />
            <div className={s.sizer}>{children}</div>
            <div className={s.bar} />
        </div>
    )
}
export default CanvasSizer
