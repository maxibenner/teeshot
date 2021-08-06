import { useEffect, useState } from "react"

export default function useRecorder(element) {
    //var mediaRecorder
    const [mediaRecorder, setMediaRecorder] = useState()

    // Init
    useEffect(() => {
        if (element) {
            // Get stream from element
            const stream = element.captureStream(30)

            // Create media recorder with stream
            const mediaRecorder = new MediaRecorder(stream)

            // Save to file
            mediaRecorder.ondataavailable = (blob) => {
                saveFile(blob)
            }

            // Set state
            setMediaRecorder(mediaRecorder)
        }
    }, [element])

    function capture(durationInSeconds = 1) {
        console.log(mediaRecorder)
        mediaRecorder.start()

        setTimeout(() => {
            mediaRecorder.stop()
        }, durationInSeconds * 1000)
    }

    function saveFile(blob) {
        var blobUrl = URL.createObjectURL(blob.data)
        var link = document.createElement("a")
        link.href = blobUrl
        link.download = "aDefaultFileName.mp4"
        link.click()
    }

    return { capture }
}
