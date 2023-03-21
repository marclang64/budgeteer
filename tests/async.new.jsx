import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// fetch movies with useCallback
	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch('REMOVED_FIREBASE_DATABASE_URL://swapi.dev/api/films/');

			if (!response.ok) {
				throw new Error('Page not Found');
			}

			const data = await response.json();

			setMovies(data.results);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	// call fetch on pageload
	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	const addMovieHandler = async movie => {
		const response = await fetch(
			'REMOVED_FIREBASE_DATABASE_URL://removed-firebase-host.invalid/movies.json',
			{
				method: 'POST',
				body: JSON.stringify(movie),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await response.json();
		console.log(data);
	};

	addMovieHandler();

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				{!isLoading && error && <pre>{error}</pre>}
				{!isLoading && !error && <MoviesList movies={movies} />}
				{isLoading && <pre>is loading...</pre>}
			</section>
		</React.Fragment>
	);
}

export default App;
