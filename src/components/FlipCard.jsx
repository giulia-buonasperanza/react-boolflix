import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import styles from "./FlipCard.module.css";

function FlipCard({ item, mediaType }) {

    const { renderStars} = useContext(GlobalContext);


    return (
        <Link
            to={`/${mediaType}/${item.id}`}
            className={styles.flipCard}
        >
            <div className={styles.flipCardInner}>

                {/* FRONT */}
                <div className={styles.flipCardFront}>
                    <img
                        src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                        alt={item.title || item.name}
                    />
                </div>

                {/* BACK */}
                <div className={styles.flipCardBack}>

                    <h4>{item.title || item.name}</h4>
                    {item.origin_country &&
                        <p><strong>Paese di Produzione: </strong>
                            <img src={`https://flagcdn.com/32x24/${item.origin_country[0].toLowerCase()}.png`} alt={item.origin_country[0]} />
                        </p>}
                    <p><strong>Voto: </strong>
                        <span className="ms-2">{renderStars(item?.vote_average)}</span>
                    </p>
                    <p><strong>Descrizione: </strong>{item?.overview || "Descrizione non disponibile"}</p>
                </div>
            </div>
        </Link>
    )
}
export default FlipCard;