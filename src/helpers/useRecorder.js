import { useEffect, useState } from "react"

export default function useRecorder(element) {
    var stream, webSocket
    const [mediaRecorder, setMediaRecorder] = useState()
    const [isRecording, setIsRecording] = useState(false)

    // Init
    useEffect(() => {
        if (element) {
            // Get stream from element
            stream = element.captureStream(30)

            // Create media recorder with stream
            const recorder = new MediaRecorder(stream)

            //TES
            const formData = new FormData()
            //formData.append("file", blob)

            const options = {
                method: "POST",
                body: formData,
            }

            fetch("http://localhost:8090?action=convert", options)

            // Save to file
            /*recorder.ondataavailable = (blob) => {
                
                const request = new Request("http://localhost:8090", {
                    method: "POST",
                    body: blob,
                })
                fetch("http://localhost:8090").then((res) => {
                    console.log(res)
                })
            }*/

            // Set state
            setMediaRecorder(recorder)
        }
    }, [element])

    function capture(durationInSeconds = 1) {
        mediaRecorder.start()

        setIsRecording(true)

        setTimeout(() => {
            mediaRecorder.stop()
            setIsRecording(false)
        }, durationInSeconds * 1000)
    }

    function saveFile(blob) {
        var blobUrl = URL.createObjectURL(blob.data)
        var link = document.createElement("a")
        link.href = blobUrl
        link.download = "aDefaultFileName.webm"
        link.click()
    }

    return { capture, isRecording }
}
