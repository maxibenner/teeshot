import { useEffect, useRef, useState } from "react"

const Fps = () => {
    const [frames, setFrames] = useState([])
    const [prevStamp, setPrevStamp] = useState(0)
    const [fps, setFps] = useState(0)
    const requestRef = useRef()

    useEffect(() => {
        function loop() {
            setFrames((frames) => {
                // Update fps in intervals
                setPrevStamp((prevStamp) => {
                    if (performance.now() - prevStamp >= 200) {

                        // Update timestamp
                        setFps(frames.length)
                        return performance.now()
                    } else {

                        // Don't update timestamp
                        return prevStamp
                    }
                })

                // Remove frames older than 1 second
                while (performance.now() - frames[0] >= 1010) {
                    frames.shift()
                }

                // Push new frame
                return [...frames, performance.now()]
            })

            requestRef.current = requestAnimationFrame(loop)
        }
        loop()

        return () => cancelAnimationFrame(requestRef.current)
    }, [])

    return <h3 style={styles}>{fps} fps</h3>
}

export default Fps

const styles = {
    fontSize: "1.2rem",
    position: "absolute",
    padding: "10px 15px",
    margin: "0",
    top: 0,
    right: 0,
    zIndex: 100,
    background: "black",
    color: "white",
}
