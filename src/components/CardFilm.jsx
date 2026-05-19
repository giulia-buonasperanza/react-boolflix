import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";


function CardFilm({ detail }) {

    const { renderStars} = useContext(GlobalContext);

    console.log(detail);
    return (

        <div className="card card-film h-100">
            <div>
                <img src={`https://image.tmdb.org/t/p/w342${detail.poster_path}`} alt={detail.name} className="img-film card-img-top" />
            </div>
            <div className="card-body d-flex flex-column">
                <h3 className="card-title nome-film">{detail.title || detail.name}</h3>
                <p><strong>Titolo Originale: </strong>{detail.original_title || detail.original_name}</p>
                {detail.runtime && <p><strong>Durata: </strong>{detail.runtime} min</p>}
                <p><strong>Lingua Originale: </strong>{detail.original_language}</p>
                {detail.origin_country && <p><strong>Paese di Produzione: </strong>
                    <img src={`https://flagcdn.com/32x24/${detail.origin_country[0].toLowerCase()}.png`} alt={detail.origin_country[0]} />
                </p>}
                <p><strong>Voto: </strong>
                    <span className="ms-2">{renderStars(detail?.vote_average)}</span>
                </p>
                <p><strong>Descrizione: </strong>{detail.overview || "Descrizione non disponibile"}</p>
            </div>
        </div>
    )
}
export default CardFilm;