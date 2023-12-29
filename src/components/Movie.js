import Image from 'next/image';

const Movie = ({ title, index, overview, poster_path }) => {
    const IMAGE_API = 'https://image.tmdb.org/t/p/w500/';

    return (
        <div className="movie" key={index}>
            <Image src={IMAGE_API + poster_path} alt={title}/>
            <div className="movie-overview">{overview}</div>
        </div>
    )
}

export default Movie;