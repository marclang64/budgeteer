import { Link } from 'react-router-dom';

import classes from './LinkTo.module.scss';

const LinkTo = props => {
	const { style = 'primary' } = props;

	return (
		<Link to={props.url} className={`${classes.link} ${classes[style]}`}>
			{props.children}
		</Link>
	);
};

export default LinkTo;
