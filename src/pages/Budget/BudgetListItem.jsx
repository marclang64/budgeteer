import { IoIosRemoveCircleOutline } from 'react-icons/io';
import classes from './BudgetListItem.module.scss';

const BudgetListItem = props => {
	return (
		<div className={classes.item}>
			<div className={classes.value}>$ {Number(props.data.value).toFixed(2)}</div>
			<div className={classes.name}>{props.data.name}</div>
			<button
				type="button"
				aria-label={`Remove ${props.data.name}`}
				className={classes.remove}
				onClick={() => props.removeTransaction(props.id)}
			>
				<IoIosRemoveCircleOutline />
			</button>
		</div>
	);
};

export default BudgetListItem;
