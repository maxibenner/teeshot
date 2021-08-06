import { invalidate } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { HexColorPicker } from "react-colorful"
import useStore from "../../states/modelState"
import useRecorderStore from "../../states/recorderState"
import Button from "../button/Button"
import Card from "../card/Card"
import ColorPicker from "../colorPicker/ColorPicker"
import DecalManager from "../decalManager/DecalManager"
import Divider from "../divider/Divider"
import Icon from "../icon/Icon"
import InputText from "../inputText/InputText"
import s from "./controlPanel.module.css"
import { FaShapes } from "react-icons/fa"
var bgData = require("../../constants/bg.json")
var bgSampleImages = require("../../constants/bgSampleImages.json")
var propData = require("../../constants/props.json")

export default function ControlPanel() {
    const inputRef = useRef()
    const customBgRef = useRef()
    const {
        animation,
        backgroundColor,
        backgroundImage,
        decals,
        modelColor,
        props,
        text,
        setAnimation,
        setBackgroundColor,
        setBackgroundImage,
        setDecalPath,
        setModelColor,
        setProps,
        set,
        setSet,
        setText,
    } = useStore()
    const { mode } = useRecorderStore()

    // SET ACTIVE DECAL PATH
    const loadDecal = () => {
        const path = URL.createObjectURL(inputRef.current.files[0])
        setDecalPath(path)

        // Clear decal
        inputRef.current.value = ""
    }

    // KEYDOWN
    useEffect(() => {
        function handlekeydownEvent(event) {
            const { key } = event
            key === "Escape" && setDecalPath(null)
        }
        document.addEventListener("keydown", handlekeydownEvent)
        return () => {
            document.removeEventListener("keydown", handlekeydownEvent)
        }
    }, []) //eslint-disable-line

    // BUTTON CLICK
    const handleButtonClick = () => inputRef.current.click()

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

    // HANDLE PROP CHANGE
    const handlePropChange = (name) => {
        if (props === name) {
            setProps(null)
        } else {
            setProps(name)
        }
    }

    return (
        <div className={s.wrapper}>
            <div className={s.containerInner}>
                <Card invisible>
                    <Button
                        type="ghost"
                        text=" Upload Design"
                        icon={<FaShapes />}
                        onClick={handleButtonClick}
                    />
                    <input
                        className={s.input}
                        onInput={() => loadDecal()}
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                    />
                </Card>
                <Card title="Background">
                    <div className={s.gridContainer}>
                        {bgData.map((bg) => {
                            return (
                                <Icon
                                    imgSrc={bg.thumb}
                                    onClick={() => {
                                        setSet(bg.name)
                                    }}
                                    match={set}
                                    id={bg.name}
                                    key={bg.name}
                                    inactive={mode in bg.modes ? false : true}
                                />
                            )
                        })}
                    </div>
                    {set !== "bg_transparent" && <Divider />}
                    {set === "bg_color" && (
                        <HexColorPicker
                            style={{
                                marginTop: "10px",
                                width: "100%",
                                height: "150px",
                            }}
                            color={backgroundColor}
                            onChange={setBackgroundColor}
                        />
                    )}
                    {set === "bg_image" && (
                        <>
                            <div className={s.gridContainer}>
                                <Icon
                                    imgSrc={"/thumbs/upload.svg"}
                                    key={"custom"}
                                    id={"custom"}
                                    match={backgroundImage.name}
                                    onClick={() => customBgRef.current.click()}
                                />
                                <input
                                    ref={customBgRef}
                                    style={{ display: "none" }}
                                    type="file"
                                    accept="image/*"
                                    onChange={(data) =>
                                        setBackgroundImage({
                                            data: data.target.files[0],
                                            name: "custom",
                                        })
                                    }
                                />
                                {bgSampleImages.map((img) => {
                                    return (
                                        <Icon
                                            imgSrc={img.path}
                                            key={img.name}
                                            id={img.name}
                                            match={backgroundImage.name}
                                            onClick={() => {
                                                setBackgroundImage({
                                                    path: img.path,
                                                    name: img.name,
                                                    author: img.author,
                                                })
                                            }}
                                        />
                                    )
                                })}
                            </div>
                        </>
                    )}
                </Card>
                <Card title="Props">
                    <div className={s.gridContainer}>
                        {propData.map((prop) => {
                            return (
                                <Icon
                                    imgSrc={prop.thumb}
                                    onClick={() => handlePropChange(prop.name)}
                                    match={props}
                                    id={prop.name}
                                    key={prop.name}
                                />
                            )
                        })}
                    </div>
                    {props === "prop_text" && (
                        <>
                            <Divider style={{ marginBottom: "10px" }} />
                            <InputText
                                value={text}
                                onChange={(value) => setText(value)}
                                maxLength={14}
                            />
                        </>
                    )}
                </Card>
                <Card title="Animate">
                    <Icon
                        imgSrc="/thumbs/rotate.svg"
                        onClick={() => handleAnimation("animation_360")}
                        match={animation}
                        id="animation_360"
                    />
                </Card>
                <Card title="Product">
                    <ColorPicker
                        title="Color"
                        color={modelColor}
                        setColor={setModelColor}
                    />
                </Card>
                {decals.length > 0 && (
                    <Card title="Decals">
                        <DecalManager />
                    </Card>
                )}
            </div>
        </div>
    )
}
