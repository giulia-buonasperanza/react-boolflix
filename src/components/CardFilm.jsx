function CardFilm({ detail }) {

    function renderStars() {
        const voteAverage = detail.vote_average / 2;
        const fullStars = Math.floor(voteAverage);
        const halfStar = voteAverage - fullStars >= 0.5;
        const stars = [];

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<i key={i} className="bi bi-star-fill text-warning" />);
            } else if (i === fullStars && halfStar) {
                stars.push(<i key={i} className="bi bi-star-half text-warning" />);
            }
            else {
                stars.push(<i key={i} className="bi bi-star text-warning" />);
            }
        }
        return stars;
    }


    console.log(detail);
    return (

        <div className="card card-film h-100">
            <div>
                <img src={`https://image.tmdb.org/t/p/w342${detail.poster_path}`} alt={detail.name} className="img-film card-img-top" />
            </div>
            <div className="card-body d-flex flex-column">
                <h3 className="card-title nome-film">{detail.title || detail.name}</h3>
                <p><strong>Titolo Originale:</strong>{detail.original_title || detail.original_name}</p>
                {detail.runtime && <p><strong>Durata:</strong>{detail.runtime} min</p>}
                <p><strong>Lingua Originale:</strong>{detail.original_language}</p>
                {detail.origin_country && <p><strong>Paese di Produzione:</strong>
                    <img src={`https://flagcdn.com/32x24/${detail.origin_country[0].toLowerCase()}.png`} alt={detail.origin_country[0]} />
                </p>}
                <p><strong>Voto:</strong>
                    <span className="ms-2">{renderStars()}</span>
                </p>
                <p><strong>Descrizione:</strong>{detail.overview}</p>
            </div>
        </div>
    )
}
export default CardFilm;