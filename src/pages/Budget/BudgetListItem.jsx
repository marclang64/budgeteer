import { IoIosRemoveCircleOutline } from 'react-icons/io';
import classes from './BudgetListItem.module.scss';

const BudgetListItem = props => {
	return (
		<div className={classes.item}>
			<div className={classes.value}>$ {props.data.value}</div>
			<div className={classes.name}>{props.data.name}</div>
			<div
				className={classes.remove}
				onClick={() => props.removeTransaction(props.id)}
			>
				<IoIosRemoveCircleOutline />
			</div>
		</div>
	);
};

export default BudgetListItem;
