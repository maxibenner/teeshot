import { useRef } from "react"
import s from "./inputText.module.css"

export default function InputText({ onChange, placeholder, maxLength }) {
    const ref = useRef()
    const handleChange = () => onChange(ref.current.value)
    return (
        <>
            <input
                ref={ref}
                placeholder={placeholder}
                onChange={handleChange}
                type="text"
                className={s.input}
                maxLength={maxLength}
            />
            {/*<label className={s.label}>Text</label>*/}
        </>
    )
}
