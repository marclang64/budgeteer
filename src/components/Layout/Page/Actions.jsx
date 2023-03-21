import LinkTo from '@components/Layout/LinkTo/LinkTo';
import { Button } from '@components/Form';
import uniqueId from '@utils/uniqueId.js';

import classes from './Actions.module.scss';

const Actions = props => {
	return (
		<div className={classes.actions}>
			{props.actions?.map(action => {
				if (action.type === 'link') {
					return (
						<LinkTo
							key={uniqueId()}
							url={action.url}
							style={action.style}
						>
							{action.title}
						</LinkTo>
					);
				}
				if (action.type === 'button') {
					return (
						<div key={uniqueId()}>
							<Button
								onClick={action.handler}
								style={action.style}
							>
								{action.title}
							</Button>
						</div>
					);
				}
			})}
		</div>
	);
};

export default Actions;
