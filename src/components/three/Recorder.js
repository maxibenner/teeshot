import { useEffect, useState, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import useRecorderStore from "../../states/recorderState"

// Websocket
var ws,
    userId = Math.floor(Math.random() * 999999999),
    socketUrl = "localhost:3001"

const Recorder = () => {
    // Get recorder store data
    const { duration, fps, active, setActive } = useRecorderStore()

    const [recording, setRecording] = useState(false)

    const frameCounter = useRef()
    frameCounter.current = 0

    // Take over render loop
    const { scene, camera } = useThree()

    // Websocket init
    useEffect(() => {
        if (active) {
            ws = new WebSocket(`ws://${socketUrl}?id=${userId}`)

            // Star recording
            ws.onopen = () => {
                setRecording(true)
            }
        } else {
            setRecording(false)
        }
    }, [active])

    useFrame(
        ({ gl }) => {
            if (recording) {
                // Capture and send
                const f = gl.domElement.toDataURL()
                send_frame_to_server(f)

                // Progress
                if (frameCounter.current !== duration * fps) {
                    // Continue
                    gl.clearDepth()
                    gl.render(scene, camera)

                    // Advance counter
                    frameCounter.current += 1
                } else {
                    // Done
                    setActive(false)
                    start_processing(fps)
                }
            }
        },
        recording ? 10 : 0
    )

    function send_frame_to_server(dataUrl) {
        // Send to server
        const object = JSON.stringify({
            action: "add_frame",
            data: dataUrl,
        })
        ws.send(object)
    }

    function start_processing(framerate) {
        // Send to server
        const object = JSON.stringify({
            action: "process",
            data: null,
            duration: duration,
            fps: framerate,
        })
        ws.send(object)
    }

    return null
}

export default Recorder
