import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AuthContext from '@context/auth-context';

const ProtectedRoute = props => {
	const authCtx = useContext(AuthContext);

	if (!authCtx.isLoggedIn) {
		return <Navigate to="/" />;
	}

	return props.children ? props.children : <Outlet />;
};

export default ProtectedRoute;
