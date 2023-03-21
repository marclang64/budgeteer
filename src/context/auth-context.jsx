import { useState, createContext } from 'react';
import useFetch from '@hooks/useFetch';

const initialState = {
	token: '',
	isLoggedIn: false,
	username: null,
	userId: null,
	handlerLogin: () => {},
	handlerLogout: () => {},
	checkRoles: () => {},
};

const AuthContext = createContext(initialState);

export const AuthContextProvider = props => {
	const initialToken = localStorage.getItem('token');
	const initialUsername = localStorage.getItem('username');
	const initialUserId = localStorage.getItem('userid');

	const [isLoading, error, fetchData] = useFetch();
	const [token, setToken] = useState(initialToken);
	const [username, setUsername] = useState(initialUsername);
	const [userId, setUserId] = useState(initialUserId);
	const isLoggedIn = !!token;

	const handlerLogin = (token, userId, username) => {
		localStorage.setItem('token', token);
		localStorage.setItem('username', username);
		localStorage.setItem('userid', userId);
		setToken(token);
		setUsername(username);
		setUserId(userId);
	};

	const handlerLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		localStorage.removeItem('roles');
		setToken(null);
		setUsername(null);
		setUserId(null);
	};

	const authorize = async () => {
		const response = await fetch(
			`REMOVED_FIREBASE_DATABASE_URL://identitytoolkit.googleapis.com/v1/accounts:lookup?key=REMOVED_FIREBASE_API_KEY`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ idToken: token }),
			}
		);

		if (!response.ok) {
			handlerLogout();
			throw new Error('Request failed!');
		}

		const res = await response.json();
		const authed = (await res.users[0].localId) === userId;

		if (!authed) {
			handlerLogout();
		}
	};

	const authCtx = {
		token: token,
		isLoggedIn: isLoggedIn,
		username: username,
		userId: userId,
		authorize: authorize,
		handlerLogin: handlerLogin,
		handlerLogout: handlerLogout,
	};

	return (
		<AuthContext.Provider value={authCtx}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
