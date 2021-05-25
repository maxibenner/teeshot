import React from "react"
import Card from "../card/Card"
import IconWithText from "../iconWithText/IconWithText"
import keyR from "../../assets/keys/keyR.svg"
import keyDown from "../../assets/keys/keyDown.svg"
import keyEscRed from "../../assets/keys/keyEscRed.svg"
import keyUp from "../../assets/keys/keyUp.svg"
import useStore from "../../states/modelState"
import s from "./overlay.module.css"

const Overlay = () => {
    const { decalPath } = useStore()
    return (
        <div className={s.wrapper}>
            <Card bg narrow>
                <IconWithText
                    imgSrc={keyR}
                    imgAlt="rotate"
                    textContent="Rotate"
                />
                {decalPath && (
                    <>
                        <IconWithText
                            imgSrc={keyUp}
                            imgAlt="up"
                            textContent="Scale up"
                        />
                        <IconWithText
                            imgSrc={keyDown}
                            imgAlt="down"
                            textContent="Scale down"
                        />
                        <IconWithText
                            imgSrc={keyEscRed}
                            imgAlt="Esc"
                            textContent="Cancel"
                        />
                    </>
                )}
            </Card>
        </div>
    )
}

export default Overlay
