import { useEffect } from "react"

export default function useRecorder(element) {
    var mediaRecorder, stream

    useEffect(() => {
        if (element) {
            stream = element.captureStream(25)
            mediaRecorder = new MediaRecorder(stream)
            mediaRecorder.ondataavailable = (blob) => {
                saveFile(blob)
            }
        }
    }, [element])

    function capture(durationInSeconds = 1) {
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
