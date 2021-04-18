import React, { useState, useEffect } from "react";

export default function() {

  let [frameTimeState, setFrameTimeState] = useState({
    fps: 0,
    // better use performance.now()
    // but some static generators like gatsby
    // might have problems with that
    lastStamp: Date.now(),
    framesCount: 0
  });

  useEffect(() => {
    // NOTE: timeout is here
    // cuz requestAnimationFrame is deferred
    // and to prevent setStates on unmounted
    let timeout = null;

    requestAnimationFrame(() => timeout = setTimeout(()=>{

      const currentStamp = Date.now();
      const shouldSetState = currentStamp - frameTimeState.lastStamp > 1000;

      const newFramesCount = frameTimeState.framesCount + 1;

      if (shouldSetState) {
        setFrameTimeState({
          fps: frameTimeState.framesCount,
          lastStamp: currentStamp,
          framesCount: 0,
        });
      } else {
        setFrameTimeState({
          ...frameTimeState,
          framesCount: newFramesCount,
        });
      }
    },0));
    return () => timeout && clearTimeout(timeout);
  }, [frameTimeState])

  return <h3 style={styles}>{frameTimeState.fps} fps</h3>
}

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
