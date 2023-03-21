import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '@context/auth-context';

import { Page } from '@components/Layout/';
import LoginForm from './LoginForm';

const Home = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (authCtx.isLoggedIn) {
			navigate('/budget');
		}
	}, []);

	return (
		<Page title="Login">{!authCtx.isLoggedIn ? <LoginForm /> : null}</Page>
	);
};

export default Home;
