import { useRef, useEffect } from "react"
import s from "./inputText.module.css"

export default function InputText({
    onChange,
    placeholder,
    label,
    id,
    value,
    maxLength,
    style,
    type,
}) {
    const ref = useRef()
    const handleChange = () => onChange(ref.current.value)
    useEffect(() => (ref.current.value = value), [value])
    return (
        <div style={style}>
            <input
                id={id}
                ref={ref}
                placeholder={placeholder}
                onChange={handleChange}
                type={type ? type : "text"}
                className={s.input}
                maxLength={maxLength}
            />
            {label && (
                <label htmlFor={id} className={s.label}>
                    {label}
                </label>
            )}
        </div>
    )
}
