import s from "./iconWithText.module.css"

export default function IconWithText({ imgSrc, imgAlt, textContent, onClick }) {
    return (
        <div className={s.wrapper} onClick={onClick}>
            <img className={s.img} src={imgSrc} alt={imgAlt} />
            {textContent && <p className={s.text}>{textContent}</p>}
        </div>
    )
}