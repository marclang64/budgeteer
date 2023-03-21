import { Layout } from '@components/Layout/';
import ProtectedRoute from '@routing/ProtectedRoute';

import Home from '@pages/Home/Home';
import Budget from '@pages/Budget/Budget';
import Logout from '@pages/Logout/Logout';
import Settings from '@pages/Settings/Settings';

import Error from '@pages/Error/Error';

const RouteConfig = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'budget',
				element: <ProtectedRoute />,
				children: [{ index: true, element: <Budget /> }],
			},
			{
				path: 'settings',
				element: <ProtectedRoute />,
				children: [{ index: true, element: <Settings /> }],
			},
			{
				path: 'logout',
				element: <Logout />,
			},
			{ path: '*', element: <Error /> },
		],
	},
];

export default RouteConfig;
