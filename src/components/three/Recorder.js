import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import useRecorderStore from "../../states/recorderState"

// Websocket
var sessionId = "s" + Math.floor(Math.random() * 999999999),
    serverUrl = "localhost:3001"

const Recorder = () => {
    // Get recorder store data
    const { duration, fps, active, setActive } = useRecorderStore()

    const recording = useRef(false)
    const frameCounter = useRef(0)
    const nameCounter = useRef(0)

    // Get scene and camera
    const { scene, camera } = useThree()

    // Start recording
    useEffect(() => {
        if (active === true) {
            recording.current = true

            // Refresh session id
            sessionId = "s" + Math.floor(Math.random() * 999999999)
        }
    }, [active])

    // Recording process
    useFrame(
        ({ gl }) => {
            if (recording.current) {
                // Progress
                if (nameCounter.current <= duration * fps) {
                    // Capture and send every other frame
                    if (
                        frameCounter.current % 2 == 0 ||
                        frameCounter.current == 0
                    ) {
                        const frame = gl.domElement.toDataURL()
                        send_frame_to_server(
                            frame,
                            nameCounter.current + 1,
                            sessionId
                        ).then(() => {
                            // Advance name counter
                            nameCounter.current += 1

                            // Render next frame
                            gl.clearDepth()
                            gl.render(scene, camera)
                        })
                    } else {
                        // Render next frame
                        gl.clearDepth()
                        gl.render(scene, camera)
                    }

                    // Advance counter
                    frameCounter.current += 1
                } else {
                    // Done
                    recording.current = false
                    frameCounter.current = 0
                    setActive(false)

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
        recording.current ? 10 : 0
    )

    async function send_frame_to_server(dataUrl, frameNumber, sessionId) {
        // Send to server
        const object = JSON.stringify({
            action: "add_frame",
            data: dataUrl,
            sessionId: sessionId,
            frameNumber: frameNumber,
        })
        fetch(`http://${serverUrl}/add_frame`, {
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

        return
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
