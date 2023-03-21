import { useState, useCallback } from 'react';

const useFetch = () => {
	// add states for isLoading and error
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// add callback-function to process data and
	// request-data into fetch-function
	const fetchData = useCallback(async (applyData, requestConfig) => {
		setIsLoading(true);
		setError(null);

		try {
			// fetch data with defaults
			const response = await fetch(requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : 'GET',
				headers: requestConfig.headers ? requestConfig.headers : {},
				body: requestConfig.body
					? JSON.stringify(requestConfig.body)
					: null,
			});

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();

			if (applyData !== null && data === null) {
				throw new Error('No Data found!');
			}

			if (applyData !== null) {
				applyData(data);
			}
		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	}, []);

	// return states and fetch-function
	return [isLoading, error, fetchData];
};

export default useFetch;
