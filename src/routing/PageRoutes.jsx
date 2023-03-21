import { useRoutes } from 'react-router-dom';
import RouteConfig from '@shared/routes/RouteConfig';

const PageRoutes = () => {
	return useRoutes(RouteConfig);
};

export default PageRoutes;
