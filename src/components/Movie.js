import Image from 'next/image';

const Movie = ({ title, index, overview, poster_path }) => {
    const IMAGE_API = 'https://image.tmdb.org/t/p/w500/';

    return (
        <div className="movie" key={index}>
            <Image 
                src={IMAGE_API + poster_path} 
                alt={title} 
                width={500} // Width of the image (you can adjust this)
                height={750} // Height of the image (adjust this to maintain the aspect ratio)
                layout="responsive" // This will keep the aspect ratio and make image responsive
            />
            <div className="movie-overview">{overview}</div>
        </div>
    )
}

export default Movie;