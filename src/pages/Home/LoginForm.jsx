import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '@context/auth-context';
import useFetch from '@hooks/useFetch';

import { Form, Input, Button } from '@components/Form/';

import classes from './LoginForm.module.scss';

const LoginForm = () => {
	const authCtx = useContext(AuthContext);
	const [isLoading, error, fetchData] = useFetch();
	const navigate = useNavigate();
	const usernameInput = useRef();
	const passwordInput = useRef();

	const handlerSubmit = event => {
		event.preventDefault();

		const loginObj = {
			email: usernameInput.current.value,
			password: passwordInput.current.value,
			returnSecureToken: true,
		};

		const handleData = data => {
			authCtx.handlerLogin(
				data.idToken,
				data.localId,
				usernameInput.current.value
			);
			usernameInput.current.value = '';
			passwordInput.current.value = '';
			navigate('/budget');
		};

		fetchData(handleData, {
			url: `REMOVED_FIREBASE_DATABASE_URL://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=REMOVED_FIREBASE_API_KEY`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: { ...loginObj },
		});
	};

	return (
		<Form className={classes.loginform} onSubmit={handlerSubmit}>
			{error ? (
				<div className={classes.error}>Error: Invalid Login</div>
			) : null}

			<Input
				label="Username"
				type="text"
				name="username"
				ref={usernameInput}
				required
				autoComplete="off"
			/>
			<Input
				label="Password"
				type="password"
				name="password"
				ref={passwordInput}
				required
			/>
			<Button type="submit">Login</Button>
		</Form>
	);
};

export default LoginForm;
