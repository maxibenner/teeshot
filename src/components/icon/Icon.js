import s from "./icon.module.css"

export default function Icon({
    imgSrc,
    imgAlt,
    textContent,
    onClick,
    ...rest
}) {
    return (
        <div className={s.wrapper} onClick={onClick} {...rest}>
            <img className={s.img} src={imgSrc} alt={imgAlt} />
            {textContent && <p className={s.text}>{textContent}</p>}
        </div>
    )
}
