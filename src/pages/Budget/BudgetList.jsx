import BudgetListItem from './BudgetListItem';
import classes from './BudgetList.module.scss';

const BudgetList = ({ budgetData, removeTransaction }) => {
	const transactions = Object.entries(budgetData.transactions || {}).map(
		([id, data]) => ({ id, ...data }),
	);
	return (
		<div className={classes.budgetlist}>
			{transactions.map(transaction => (
				<BudgetListItem
					key={transaction.id}
					id={transaction.id}
					data={transaction}
					removeTransaction={removeTransaction}
				/>
			))}
		</div>
	);
};
export default BudgetList;
