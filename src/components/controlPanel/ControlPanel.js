import { useEffect, useRef, useState } from "react"
import { RiArrowDropLeftLine } from "react-icons/ri"
import keyDown from "../../assets/keys/keyDown.svg"
import keyEscRed from "../../assets/keys/keyEscRed.svg"
import keyR from "../../assets/keys/keyR.svg"
import keyUp from "../../assets/keys/keyUp.svg"
import environmentBgThumb from "../../assets/thumbs/environmentBg.png"
import plainBgThumb from "../../assets/thumbs/plainBg.svg"
import shapesBgThumb from "../../assets/thumbs/shapesBg.png"
import textBgThumb from "../../assets/thumbs/textBg.png"
import transparentBgThumb from "../../assets/thumbs/transparentBg.svg"
import useStore from "../../states/modelState"
import Button from "../button/Button"
import Card from "../card/Card"
import ColorPicker from "../colorPicker/ColorPicker"
import DecalManager from "../decalManager/DecalManager"
import Icon from "../icon/Icon"
import IconWithText from "../iconWithText/IconWithText"
import InputText from "../inputText/InputText"
import ErrorBoundary from "../errorBoundary/ErrorBoundary"
import s from "./controlPanel.module.css"

export default function ControlPanel() {
    const inputRef = useRef()
    const {
        backgroundColor,
        decals,
        decalPath,
        modelColor,
        text,
        setBackgroundColor,
        setDecalPath,
        setModelColor,
        set,
        setSet,
        setText,
    } = useStore()

    // SET ACTIVE DECAL PATH
    const loadDecal = () => {
        const path = URL.createObjectURL(inputRef.current.files[0])
        setDecalPath(path)
    }

    // KEYDOWN
    useEffect(() => {
        function handlekeydownEvent(event) {
            const { key } = event
            key == "Escape" && setDecalPath(null)
        }
        document.addEventListener("keydown", handlekeydownEvent)
        return () => {
            document.removeEventListener("keydown", handlekeydownEvent)
        }
    }, [])

    // BUTTON CLICK
    const handleButtonClick = () => {
        if (window.innerWidth < window.innerHeight) {
            window.alert(
                "Placing designs doesn't yet work well on a phone. Switch to a computer and head to fotura.co to try it out!"
            )
        } else {
            inputRef.current.click()
        }
    }

    // TEXT INPUT
    const handleText = (fieldValue) => {
        setText(fieldValue)
    }

    // EXPAND PANEL
    const [open, setOpen] = useState(true)
    const togglePanel = () => {
        setOpen((state) => !state)
    }

    return (
        <>
            <div className={open ? s.wrapper_open : s.wrapper_closed}>
                <div
                    className={open ? s.handle_open : s.handle_closed}
                    onClick={togglePanel}
                >
                    <RiArrowDropLeftLine />
                </div>
                <div className={s.containerInner}>
                    <Card invisible>
                        <Button onClick={handleButtonClick}>
                            Upload Design
                        </Button>
                        <input
                            className={s.input}
                            onInput={() => loadDecal()}
                            ref={inputRef}
                            type="file"
                        />
                    </Card>
                    <Card title="Backgrounds" flex>
                        <Icon
                            imgSrc={transparentBgThumb}
                            onClick={() => {
                                setSet("TransparentBg")
                            }}
                            id="bg_transparent"
                        />
                        <Icon
                            imgSrc={plainBgThumb}
                            onClick={() => {
                                setSet("PlainBg")
                            }}
                            id="bg_plain"
                        />
                        <Icon
                            imgSrc={shapesBgThumb}
                            onClick={() => {
                                setSet("ShapesBg")
                            }}
                            id="bg_shapes"
                        />
                        <Icon
                            imgSrc={environmentBgThumb}
                            onClick={() => {
                                setSet("EnvironmentBg")
                            }}
                            id="bg_environment"
                        />
                        <Icon
                            imgSrc={textBgThumb}
                            onClick={() => {
                                setSet("TextBg")
                            }}
                            id="bg_text"
                        />
                    </Card>
                    {set === "TextBg" && (
                        <Card title="Text">
                            <InputText
                                placeholder={text}
                                onChange={handleText}
                                maxLength={14}
                            />
                        </Card>
                    )}

                    <Card title="Colors">
                        <ColorPicker
                            title="Model"
                            color={modelColor}
                            setColor={setModelColor}
                        />
                        <ColorPicker
                            title="Background"
                            color={backgroundColor}
                            setColor={setBackgroundColor}
                        />
                    </Card>

                    <Card title="Hotkeys">
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
                    {decals.length > 0 && (
                        <Card title="Decals">
                            <DecalManager />
                        </Card>
                    )}
                </div>
            </div>
        </>
    )
}
