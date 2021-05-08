import { useEffect, useState, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import useRecorderStore from "../../states/recorderState"

// Websocket
var ws,
    userId = "u" + Math.floor(Math.random() * 999999999),
    sessionId = "s" + Math.floor(Math.random() * 999999999),
    socketUrl = "localhost:3001"

const Recorder = () => {
    // Get recorder store data
    const { duration, fps, active, setActive } = useRecorderStore()

    const recording = useRef(false)
    const frameCounter = useRef(0)

    // Get scene and camera
    const { scene, camera } = useThree()

    // Websocket init
    useEffect(() => {
        ws = new WebSocket(`ws://${socketUrl}?id=${userId}`)

        // Message handling
        ws.onmessage = (message) => {
            const res = JSON.parse(message.data)
            if (res.action === "download") {
                var a = document.createElement("a")

                a.setAttribute("download", "fotura.mp4")
                a.setAttribute("href", "http://localhost:3001/clip.mp4")
                a.click()

            }
        }
    }, [])

    // Start recording
    useEffect(() => {
        if (active) {
            recording.current = true

            // Refresh session id
            sessionId = "s" + Math.floor(Math.random() * 999999999)
        }
    }, [active])

    // Recording process
    useFrame(
        ({ gl }) => {
            if (recording.current) {
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
                    recording.current = false
                    setActive(false)
                    start_processing(fps)
                }
            }
        },
        recording.current ? 10 : 0
    )

    function send_frame_to_server(dataUrl) {
        // Send to server
        const object = JSON.stringify({
            action: "add_frame",
            data: dataUrl,
            sessionId: sessionId,
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
            sessionId: sessionId,
        })
        ws.send(object)
    }

    return null
}

export default Recorder
