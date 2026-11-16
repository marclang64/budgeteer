import { Navigate } from 'react-router-dom';
import { Layout } from '@components/Layout/';
import Budget from '@pages/Budget/Budget';
import Settings from '@pages/Settings/Settings';
const RouteConfig = [{ path: '/', element: <Layout />, children: [
  { index: true, element: <Navigate to="/budget" replace /> },
  { path: 'budget', element: <Budget /> },
  { path: 'settings', element: <Settings /> },
  { path: '*', element: <Navigate to="/budget" replace /> },
]}];
export default RouteConfig;
