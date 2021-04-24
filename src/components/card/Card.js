import s from "./card.module.css"

const Card = ({ title, flex, children, invisible }) => {
    return (
        <div className={!invisible ? s.visible : s.invisible}>
            {title && <h3 className={s.h3}>{title}</h3>}
            <div className={flex ? s.inner_flex : s.inner_block}>
                {children}
            </div>
        </div>
    )
}

export default Card
