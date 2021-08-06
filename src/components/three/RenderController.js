import { useThree, advance } from "@react-three/fiber"
import React from "react"
import useRecorderStore from "../../states/recorderState"
import { serverUrl } from "../../constants/env"

var sessionId = "s" + Math.floor(Math.random() * 999999999),
    totalFrames,
    renderLoop

const RenderController = () => {
    const { active, fps, duration, setActive, setProgress } = useRecorderStore()
    const { clock, gl, set } = useThree()
    const [frameDelay] = React.useState(1000 / fps)

    // Auto render-loop
    React.useEffect(() => {
        set({ frameloop: "never" })
        renderLoop = setInterval(() => {
            advance()
        }, 16)

        const clearAll = () => {
            clearInterval(renderLoop)
            set({ frameloop: "demand" })
        }

        return () => clearAll()
    }, [active]) //eslint-disable-line

    // Start/stop manual render
    React.useEffect(() => {
        if (active === true) {
            // Disable auto render-loop
            clearInterval(renderLoop)

            // Capture => send => stop
            capture_send().then(() => {
                // Deactivate manual render-loop
                setActive(false)

                // Process frames
                start_processing(sessionId, duration, fps).then((url) => {
                    // Reset progress
                    setProgress(0)

                    // Get new session id
                    sessionId = "s" + Math.floor(Math.random() * 999999999)

                    // Download processed file
                    downloadResource(`${serverUrl}/${url}`, "foturaClip.mp4")
                })
            })
        }
    }, [active]) //eslint-disable-line

    async function capture_send() {
        console.log(serverUrl)
        // Calculate total frames
        totalFrames = fps * duration * 2 // double to match 60fps

        // Counter
        let frameCounter = 0

        // Capture and send
        for (var i = 0; i < totalFrames; i++) {
            // Only send every other frame for 30 fps
            if (frameCounter % 2) {
                // Capture canvas
                const image = gl.domElement.toDataURL()

                // Send to server
                const response = await send_frame_to_server(image, sessionId)

                // Stop if error
                console.log(/*response*/)
                if (!response) {
                    i = totalFrames
                }
            }

            // Advance frame-loop
            advance(clock.elapsedTime * 1000 + frameDelay)

            // Set progress
            frameCounter++
            setProgress(Math.floor((frameCounter / totalFrames) * 100))
        }

        // Reset frameCounter
        frameCounter = 0

        return
    }

    return null
}

export default RenderController

////////////////////////////////////////////////////////////////////////////
async function send_frame_to_server(dataUrl, sessionId) {
    // Send to server
    const object = JSON.stringify({
        action: "add_frame",
        data: dataUrl,
        sessionId: sessionId,
    })
    const req = await fetch(`${serverUrl}/add_frame`, {
        method: "POST",
        headers: new Headers({
            Origin: window.origin,
            Accept: "image/png",
            "Content-Type": "image/png",
        }),
        mode: "cors",
        body: object,
    })

    const data = await req.json()

    return data
}

async function start_processing(sessionId, duration, fps) {
    const url = fetch(
        `${serverUrl}/process?duration=${duration}&fps=${fps}&sessionId=${sessionId}`
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
