import Actions from './Actions';

import classes from './Page.module.scss';

const Page = props => {
	return (
		<div className={classes.page}>
			<div className={classes.heading}>
				<h1>{props.title}</h1>
				<Actions actions={props.actions} />
			</div>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

export default Page;
