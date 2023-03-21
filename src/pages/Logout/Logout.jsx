import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '@context/auth-context';

const Logout = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		authCtx.handlerLogout();
		navigate('/');
	}, []);
};

export default Logout;
