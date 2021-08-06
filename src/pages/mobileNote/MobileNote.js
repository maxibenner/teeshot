import React from "react"
import NoteBox from "../../components/noteBox/Notebox"
import styles from "./mobileNote.module.css"

const MobileNote = () => {
    return (
        <div className={styles.noteBoxWrapper}>
            <NoteBox>
                <p>
                    👨🏻‍💻 Limited experience on mobile devices, switch to a desktop
                    device to start creating!
                </p>
            </NoteBox>
        </div>
    )
}

export default MobileNote
