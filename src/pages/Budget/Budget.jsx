import { useState, useEffect } from 'react';
import { Page } from '@components/Layout/';
import { readBudget, saveBudget } from '@utils/localBudget';
import BudgetForm from './BudgetForm';
import BudgetList from './BudgetList';
import { IoSettingsOutline } from 'react-icons/io5';

const Budget = () => {
	const today = new Date();
	const [year, setYear] = useState(String(today.getFullYear()));
	const [month, setMonth] = useState(
		String(today.getMonth() + 1).padStart(2, '0'),
	);
	const [data, setData] = useState(readBudget);

	useEffect(() => {
		const reload = () => setData(readBudget());
		window.addEventListener('budgeteer-data-changed', reload);
		window.addEventListener('storage', reload);
		return () => {
			window.removeEventListener('budgeteer-data-changed', reload);
			window.removeEventListener('storage', reload);
		};
	}, []);

	const monthData = data.budget?.[year]?.[month] || {};
	const budgetSettings = {
		income: monthData.income ?? data.defaultIncome ?? 0,
		outgoing: monthData.outgoing ?? data.defaultOutgoing ?? 0,
		defaultIncome: data.defaultIncome ?? 0,
		defaultOutgoing: data.defaultOutgoing ?? 0,
	};

	const persist = next => {
		saveBudget(next);
		setData(next);
	};

	const updateMonth = updater => {
		const next = structuredClone(readBudget());
		next.budget ||= {};
		next.budget[year] ||= {};
		next.budget[year][month] = updater(next.budget[year][month] || {});
		persist(next);
	};

	const addTransaction = (_year, _month, transaction) =>
		updateMonth(current => ({
			...current,
			transactions: {
				...current.transactions,
				[crypto.randomUUID()]: transaction,
			},
		}));

	const removeTransaction = id =>
		updateMonth(current => {
			const transactions = { ...current.transactions };
			delete transactions[id];
			return { ...current, transactions };
		});

	const updateAmounts = (income, outgoing) =>
		updateMonth(current => ({ ...current, income, outgoing }));

	const years = [
		...new Set([
			...Array.from({ length: 11 }, (_, i) =>
				String(today.getFullYear() - 5 + i),
			),
			year,
			...Object.keys(data.budget || {}),
		]),
	].sort((a, b) => Number(b) - Number(a));

	return (
		<Page
			title="Budgeteer"
			actions={[
				{
					type: 'link',
					url: '/settings',
					title: <IoSettingsOutline />,
					style: 'icon',
				},
			]}
		>
			<BudgetForm
				addTransaction={addTransaction}
				updateAmounts={updateAmounts}
				budgetPeriods={years}
				budgetSettings={budgetSettings}
				setYear={setYear}
				setMonth={setMonth}
				currYear={year}
				currMonth={month}
				budgetData={monthData}
			/>
			<BudgetList
				budgetData={monthData}
				removeTransaction={removeTransaction}
			/>
		</Page>
	);
};
export default Budget;
