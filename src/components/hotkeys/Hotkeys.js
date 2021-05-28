import React from "react"
import IconWithText from "../iconWithText/IconWithText"
import keyR from "../../assets/keys/keyR.svg"
import keyDown from "../../assets/keys/keyDown.svg"
import keyEscRed from "../../assets/keys/keyEscRed.svg"
import keyUp from "../../assets/keys/keyUp.svg"
import useStore from "../../states/modelState"
import s from "./hotkeys.module.css"

const Hotkeys = () => {
    const { decalPath, animation } = useStore()
    return (
        <div className={s.wrapper}>
            {!animation && (
                <div className={s.inner}>
                    <IconWithText
                        imgSrc={keyR}
                        imgAlt="rotate"
                        textContent="Rotate"
                    />
                </div>
            )}
            {decalPath && (
                <div className={s.inner}>
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
                </div>
            )}
        </div>
    )
}

export default Hotkeys
