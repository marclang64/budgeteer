import { Outlet } from 'react-router-dom';

import classes from './Layout.module.scss';

const Layout = () => {
	return (
		<div className={classes.main}>
			<div className={classes.wrapper}>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
