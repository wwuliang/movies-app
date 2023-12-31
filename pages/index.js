import Head from 'next/head';
import getConfig from 'next/config';
import Movie from '@/src/components/Movie'
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { IoSearch } from "react-icons/io5";

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
    <>
      <div className="red-background"></div>
      <div className="container">
        <Head>
          <title>Movies App</title>
        </Head>
        <h1 className="title">Movies App</h1>
        <Row>
          <Col md={6} className="m-auto">
            <form className="search-form" onSubmit={search}>
              <input className="search-input" name="searchTerm" value={searchTerm} onChange={handleInput} type="text" required />
              <button className="btn-search" type="submit">
                <IoSearch className="search-icon" aria-label="Search"/> 
              </button>
            </form>
          </Col>
        </Row>
        <Container>
        <div className="movie-search-results-grid">
          {searchResults.map((each) => {
            return (
              <Movie 
                key={each.id} // Add the unique key prop here
                index={each.id} 
                title={each.title} 
                poster_path={each.poster_path} 
                overview={each.overview}
              />
            )
          })}
        </div>
        </Container>
      </div>
    </>
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