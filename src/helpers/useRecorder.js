import { useState } from "react"

export default function useRecorder(gl) {
    // Websocket
    var ws

    // Capture state
    const [isRecording, setIsRecording] = useState(false)

    // Url
    const socketUrl = "localhost:3001"

    // Start captureing
    function capture(durationInSeconds = 1, framerate = 30) {

        // Take over render loop
        console.log(gl)
        gl.autoClear = true

        // Calculate timeout in ms for given {framerate}
        const timeout = 1000 / framerate

        // Websocket init
        ws = new WebSocket(`ws://${socketUrl}`)

        ws.onopen = () => {
            // Set recording tracker
            setIsRecording(true)

            // Capture first frame and send to server
            const f = gl.domElement.toDataURL()
            send_frame_to_server(f)

            // Set capture interval
            var interval = setInterval(() => {
                const f = gl.domElement.toDataURL()
                send_frame_to_server(f)
            }, timeout)

            // Remove interval after {durationInSeconds}
            setTimeout(() => {
                setIsRecording(false)
                start_processing(framerate)
                clearInterval(interval)
            }, durationInSeconds * 1000)
        }

        ws.onmessage = (res) => {
            //console.log(res.data)
        }
    }

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
            fps: framerate,
        })
        ws.send(object)
    }

    return { capture, isRecording }
}
