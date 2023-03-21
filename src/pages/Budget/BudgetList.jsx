import { useState, useEffect } from 'react';

import BudgetListItem from './BudgetListItem';

import classes from './BudgetList.module.scss';

const BudgetList = props => {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		const loadedTransactions = [];
		const transactionsData = props.budgetData['transactions'];

		for (const key in transactionsData) {
			loadedTransactions.push({
				id: key,
				name: transactionsData[key]['name'],
				value: transactionsData[key]['value'],
			});
		}

		setTransactions(loadedTransactions);
	}, [props]);

	return (
		<div className={classes.budgetlist}>
			{transactions.map(transaction => (
				<BudgetListItem
					key={transaction.id}
					id={transaction.id}
					data={transaction}
					removeTransaction={props.removeTransaction}
				/>
			))}
		</div>
	);
};

export default BudgetList;
