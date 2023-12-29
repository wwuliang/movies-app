import Head from 'next/head';
import getConfig from 'next/config';
import Movie from '@/src/components/Movie'
import { useState, useEffect } from 'react';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Home(initialData) {
  const [ searchResults, setSearchResults ] = useState([]);

  useEffect(() => {
    setSearchResults(initialData.trendingMovies.results);
  }, [initialData]);

  return (
    <div className="containter">
      <Head>
        <h1>Movies App</h1>
          <link rel="icon" href="/favicon.ico"/>
          <link rel="stylesheet" href="/styles.css"/>
      </Head>
      <div className="movie-search-results-grid">
        {searchResults.map((each, index) => {
          return (
            <Movie index={each.id} title={each.title} poster_path={each.poster_path} overview={each.overview}/>
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