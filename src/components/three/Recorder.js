import { invalidate, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import useRecorderStore from "../../states/recorderState"

// Websocket
var sessionId = "s" + Math.floor(Math.random() * 999999999),
    serverUrl = "localhost:3001"

const Recorder = () => {
    // Get recorder store data
    const { duration, fps, active, setActive, setProgress } = useRecorderStore()

    const [totalFrames, setTotalFrames] = useState()

    const [recording, setRecording] = useState(false)
    const frameCounter = useRef(0)

    // Get scene and camera
    const { scene, camera } = useThree()

    // Start recording
    useEffect(() => {
        if (active === true) {
            // Refresh session id
            sessionId = "s" + Math.floor(Math.random() * 999999999)
            setRecording(true)
        }

        // Calculate total frames
        setTotalFrames(fps * duration)
    }, [active])

    // Recording process
    useFrame(
        ({ gl }) => {
            if (recording) {
                // Progress
                if (frameCounter.current <= duration * 60) {
                    // Capture and send every other frame
                    if (
                        frameCounter.current % 2 == 0 ||
                        frameCounter.current == 0
                    ) {
                        const frame = gl.domElement.toDataURL()

                        // Advance counter
                        frameCounter.current += 1

                        send_frame_to_server(frame, sessionId).then(() => {
                            console.log(Math.floor(frameCounter.current / 2))
                            // Advance progress state
                            setProgress(
                                Math.floor(
                                    (frameCounter.current / totalFrames) * 50
                                )
                            )

                            // Render next frame
                            gl.clearDepth()
                            gl.render(scene, camera)
                            invalidate()
                        })
                    } else {
                        // Advance counter
                        frameCounter.current += 1

                        // Next frame
                        invalidate()
                    }
                } else {
                    // Done
                    setProgress(0)
                    frameCounter.current = 0
                    setActive(false)
                    setRecording(false)

                    // Process frames
                    start_processing(sessionId, duration, fps).then((url) => {
                        downloadResource(
                            `http://${serverUrl}/${url}`,
                            "foturaClip.mp4"
                        )
                    })
                }
            }
        },
        recording ? 1 : 0
    )

    async function send_frame_to_server(dataUrl, sessionId) {
        // Send to server
        const object = JSON.stringify({
            action: "add_frame",
            data: dataUrl,
            sessionId: sessionId,
        })
        await fetch(`http://${serverUrl}/add_frame`, {
            method: "POST",
            headers: new Headers({
                Origin: window.origin,
                Accept: "image/png",
                "Content-Type": "image/png",
            }),
            mode: "cors",
            body: object,
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
    }

    async function start_processing(sessionId, duration, fps) {
        const url = fetch(
            `http://${serverUrl}/process?duration=${duration}&fps=${fps}&sessionId=${sessionId}`
        )
            .then((response) => response.json())
            .then((data) => {
                return data.url
            })
        return url
    }

    function forceDownload(blob, filename) {
        var a = document.createElement("a")
        a.download = filename
        a.href = blob
        document.body.appendChild(a)
        a.click()
        a.remove()
    }

    function downloadResource(url, filename) {
        fetch(url, {
            headers: new Headers({
                Origin: window.origin,
            }),
            mode: "cors",
        })
            .then((response) => response.blob())
            .then((blob) => {
                let blobUrl = window.URL.createObjectURL(blob)
                forceDownload(blobUrl, filename)
            })
            .catch((e) => console.error(e))
    }

    return null
}

export default Recorder
