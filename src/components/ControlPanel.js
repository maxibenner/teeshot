import { useEffect, useRef } from "react"
import keyDown from "../assets/keys/keyDown.svg"
import keyEscRed from "../assets/keys/keyEscRed.svg"
import keyR from "../assets/keys/keyR.svg"
import keyUp from "../assets/keys/keyUp.svg"
import IconWithText from "./IconWithText"
import Card from "./Card"
import ColorPicker from "./ColorPicker"
import useStore from "../states/modelState"

export default function ControlPanel({ activeDecalPath, setActiveDecalPath }) {
    const inputRef = useRef()
    const {
        backgroundColor,
        decalPath,
        modelColor,
        setBackgroundColor,
        setDecalPath,
        setModelColor,
        setSet,
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
            key === "Escape" && setDecalPath(null)
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

    return (
        <>
            <div style={styles.wrapper}>
                <Card>
                    <button onClick={handleButtonClick}>Choose Design</button>
                    <input
                        style={{ display: "none" }}
                        onInput={() => loadDecal()}
                        ref={inputRef}
                        type="file"
                    />
                </Card>
                <Card title="Product">
                    <IconWithText
                        imgSrc={keyR}
                        imgAlt="rotate"
                        textContent="Rotate"
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
                <Card title="Backgrounds">
                    <button
                        onClick={() => {
                            setSet("PlainBg")
                        }}
                    >
                        Plain
                    </button>
                    <button
                        onClick={() => {
                            setSet("ShapesBg")
                        }}
                    >
                        Shapes
                    </button>
                </Card>

                {decalPath && (
                    <Card title="Design">
                        <p style={{ color: "grey", margin: "0 5px 15px 0" }}>
                            Place your design anywhere on the product
                        </p>
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
                    </Card>
                )}
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
