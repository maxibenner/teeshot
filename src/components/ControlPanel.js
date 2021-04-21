import { useEffect, useRef } from "react"
import keyDown from "../assets/keys/keyDown.svg"
import keyEscRed from "../assets/keys/keyEscRed.svg"
import keyR from "../assets/keys/keyR.svg"
import keyUp from "../assets/keys/keyUp.svg"
import environmentBgThumb from "../assets/thumbs/environmentBg.png"
import plainBgThumb from "../assets/thumbs/plainBg.svg"
import shapesBgThumb from "../assets/thumbs/shapesBg.png"
import textBgThumb from "../assets/thumbs/textBg.png"
import transparentBgThumb from "../assets/thumbs/transparentBg.svg"
import Icon from "../components/Icon"
import useStore from "../states/modelState"
import Button from "./Button"
import Card from "./Card"
import ColorPicker from "./ColorPicker"
import IconWithText from "./IconWithText"
import InputText from "./InputText"

export default function ControlPanel() {
    const inputRef = useRef()
    const {
        backgroundColor,
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
        console.log(path)
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
        inputRef.current.click()
    }

    // TEXT INPUT
    const handleText = (fieldValue) => {
        setText(fieldValue)
    }

    return (
        <>
            <div style={styles.wrapper}>
                <Card invisible>
                    <Button onClick={handleButtonClick}>Upload Design</Button>
                    <input
                        style={{ display: "none" }}
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
                    />
                    <Icon
                        imgSrc={plainBgThumb}
                        onClick={() => {
                            setSet("PlainBg")
                        }}
                    />
                    <Icon
                        imgSrc={shapesBgThumb}
                        onClick={() => {
                            setSet("ShapesBg")
                        }}
                    />
                    <Icon
                        imgSrc={environmentBgThumb}
                        onClick={() => {
                            setSet("EnvironmentBg")
                        }}
                    />
                    <Icon
                        imgSrc={textBgThumb}
                        onClick={() => {
                            setSet("TextBg")
                        }}
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
            </div>
        </>
    )
}

const styles = {
    wrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "230px",
        margin: "20px",
    },
}
