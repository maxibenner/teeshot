import { useEffect, useRef } from "react"
import keyDown from "../../assets/keys/keyDown.svg"
import keyEscRed from "../../assets/keys/keyEscRed.svg"
import keyR from "../../assets/keys/keyR.svg"
import keyUp from "../../assets/keys/keyUp.svg"
import environmentBgThumb from "../../assets/thumbs/bg_environment.png"
import plainBgThumb from "../../assets/thumbs/bg_plain.svg"
import rotateAnimThumb from "../../assets/thumbs/rotate.svg"
import shapesBgThumb from "../../assets/thumbs/bg_shapes.png"
import textBgThumb from "../../assets/thumbs/bg_text.png"
import transparentBgThumb from "../../assets/thumbs/bg_transparent.svg"
import useStore from "../../states/modelState"
import useRecorderStore from "../../states/recorderState"
import Button from "../button/Button"
import Card from "../card/Card"
import ColorPicker from "../colorPicker/ColorPicker"
import DecalManager from "../decalManager/DecalManager"
import Icon from "../icon/Icon"
import IconWithText from "../iconWithText/IconWithText"
import InputText from "../inputText/InputText"
import s from "./controlPanel.module.css"
import { invalidate } from "@react-three/fiber"

export default function ControlPanel() {
    const inputRef = useRef()
    const {
        animation,
        backgroundColor,
        decals,
        decalPath,
        modelColor,
        text,
        setAnimation,
        setBackgroundColor,
        setDecalPath,
        setModelColor,
        set,
        setSet,
        setText,
    } = useStore()
    const { mode } = useRecorderStore()

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
    const handleButtonClick = () => inputRef.current.click()

    // TEXT INPUT
    const handleText = (fieldValue) => {
        setText(fieldValue)
    }

    // HANDLE ANIMATION
    const handleAnimation = (mode) => {
        if (animation) {
            setAnimation(null)
        } else {
            setAnimation(mode)
        }
        // Jumpstart animation
        invalidate()
    }

    return (
        <div className={s.wrapper}>
            <div className={s.containerInner}>
                <Card invisible>
                    <Button onClick={handleButtonClick}>Upload Design</Button>
                    <input
                        className={s.input}
                        onInput={() => loadDecal()}
                        ref={inputRef}
                        type="file"
                    />
                </Card>
                <Card title="Background" grid>
                    {mode === "photo" && (
                        <Icon
                            imgSrc={transparentBgThumb}
                            onClick={() => {
                                setSet("bg_transparent")
                            }}
                            match={set}
                            id="bg_transparent"
                        />
                    )}

                    <Icon
                        imgSrc={plainBgThumb}
                        onClick={() => {
                            setSet("bg_plain")
                        }}
                        match={set}
                        id="bg_plain"
                    />
                    <Icon
                        imgSrc={shapesBgThumb}
                        onClick={() => {
                            setSet("bg_shapes")
                        }}
                        match={set}
                        id="bg_shapes"
                    />
                    <Icon
                        imgSrc={environmentBgThumb}
                        onClick={() => {
                            setSet("bg_environment")
                        }}
                        match={set}
                        id="bg_environment"
                    />
                    <Icon
                        imgSrc={textBgThumb}
                        onClick={() => {
                            setSet("bg_text")
                        }}
                        match={set}
                        id="bg_text"
                    />
                </Card>
                {set === "bg_text" && (
                    <Card title="Text">
                        <InputText
                            placeholder={text}
                            onChange={handleText}
                            maxLength={14}
                        />
                    </Card>
                )}
                <Card title="Animate">
                    <Icon
                        imgSrc={rotateAnimThumb}
                        onClick={() => handleAnimation("animation_360")}
                        match={animation}
                        id="animation_360"
                    />
                </Card>
                <Card title="Color">
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
                {decalPath && (
                    <Card title="Hotkeys">
                        <IconWithText
                            imgSrc={keyR}
                            imgAlt="rotate"
                            textContent="Rotate"
                        />
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
                    </Card>
                )}
                {decals.length > 0 && (
                    <Card title="Decals">
                        <DecalManager />
                    </Card>
                )}
            </div>
        </div>
    )
}
