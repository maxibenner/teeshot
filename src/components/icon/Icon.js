import s from "./icon.module.css"

export default function Icon({
    imgSrc,
    imgAlt,
    textContent,
    onClick,
    id,
    match,
    ...rest
}) {
    const handleClick = () => {
        // External
        onClick()
    }

    return (
        <div
            onClick={handleClick}
            className={s.wrapper}
            style={{
                backgroundImage: `url(${imgSrc})`,
            }}
            {...rest}
        >
            {id === match && <div className={s.flag} />}
            {textContent && <p className={s.text}>{textContent}</p>}
        </div>
    )
}
