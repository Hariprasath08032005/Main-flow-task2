import React, { useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=1357519e';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a movie name.');
      setMovies([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}&s=${searchTerm}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
        setError('');
      } else {
        setMovies([]);
        setError(data.Error || 'No movies found.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchMovies();
    }
  };

  return (
    <div className="app-container">
      <h1>🎬 MovieLand</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading...</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;