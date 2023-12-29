import Head from 'next/head';
import getConfig from 'next/config';
import Movie from '@/src/components/Movie'
import { useState, useEffect } from 'react';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Home({trendingMovies}) {
  const [ searchResults, setSearchResults ] = useState([]);
  const [ formInput, setFormInput ] = useState({});
  const [ searchTerm, setSearchTerm ] = useState('');

  useEffect(() => {
    if (trendingMovies && trendingMovies.results) {
      setSearchResults(trendingMovies.results);
    }
  }, [trendingMovies]);
  

  const handleInput = (event) => {
    let {name, value} = event.target;
    setFormInput({...formInput, [name]: value});
    setSearchTerm(event.target.value);
  }

  const search = async (event) => {
    event.preventDefault();
    let movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${publicRuntimeConfig.apiKey}&language=en-US&query=${encodeURIComponent(formInput.searchTerm)}&page=1&include_adult=false`);
    movies = await movies.json();
    setSearchResults(movies.results);
  }

  return (
    <div className="container">
      <Head>
        <h1>Movies App</h1>
          <link rel="icon" href="/favicon.ico"/>
          <link rel="stylesheet" href="/styles.css"/>
      </Head>
      <div>
          <form onSubmit={search}>
            <input className="search" name="searchTerm" value={searchTerm} onChange={handleInput} type="text" required />
            <button className="btn-search">
              Search
            </button>
          </form>
      </div>
      <div className="movie-search-results-grid">
        {searchResults.map((each, index) => {
          return (
            <Movie 
              index={each.id} 
              title={each.title} 
              poster_path={each.poster_path} 
              overview={each.overview}
            />
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  let trendingMovies = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${serverRuntimeConfig.apiKey}`);
  trendingMovies = await trendingMovies.json();
  console.log(trendingMovies);
  return {
    props: {trendingMovies: trendingMovies},
  }
}