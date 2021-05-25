import s from "./card.module.css"

const Card = ({ title, grid, children, invisible, bg, narrow }) => {
    return (
        <div
            className={!invisible ? s.visible : s.invisible}
            style={{
                background: bg ? "white" : "transparent",
                padding: narrow && "0 5px",
                width: narrow && "150px",
            }}
        >
            {title && <h3 className={s.h3}>{title}</h3>}
            <div className={grid ? s.inner_grid : s.inner_block}>
                {children}
            </div>
        </div>
    )
}

export default Card
