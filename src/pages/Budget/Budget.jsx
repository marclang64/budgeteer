import { useState, useEffect, useContext } from 'react';
import AuthContext from '@context/auth-context';
import useFetch from '@hooks/useFetch';

import { Page } from '@components/Layout/';
import BudgetForm from './BudgetForm';
import BudgetList from './BudgetList';

import { AiOutlineLogout } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';

const Budget = () => {
	// get year and month
	const currYear = new Date().getFullYear().toString();
	const currMonthInc = new Date().getMonth() + 1;
	const currMonth = currMonthInc.toString().padStart(2, '0');

	const authCtx = useContext(AuthContext);
	const [isLoading, error, fetchData] = useFetch();
	const [isLoadingAdd, errorAdd, fetchDataAdd] = useFetch();
	const [isLoadingRemove, errorRemove, fetchDataRemove] = useFetch();
	const [budgetData, setBudgetData] = useState({});
	const [budgetPeriods, setBudgetPeriods] = useState([]);
	const [budgetSettings, setBudgetSettings] = useState({});
	const [year, setYear] = useState(currYear);
	const [month, setMonth] = useState(currMonth);

	useEffect(() => {
		authCtx.authorize();

		// callback for fetched data
		const transformData = data => {
			const budget = data.budget;
			const loadedBudgetPeriods = [];
			const defaultIncome = data.defaultIncome || 0;
			const defaultOutgoing = data.defaultOutgoing || 0;
			let monthIncome, monthOutgoing;
			let loadedBudgetData = {};

			for (const key in budget) {
				// set periods with existing data
				loadedBudgetPeriods.push(key);

				// set transactions for current period
				if (key === year && budget[key][month]) {
					loadedBudgetData = budget[key][month];

					monthIncome = budget[key][month].income;
					monthOutgoing = budget[key][month].outgoing;
				}
			}

			// set current year initial period data
			if (!loadedBudgetPeriods.includes('2023')) {
				loadedBudgetPeriods.push('2023');
			}

			setBudgetPeriods(loadedBudgetPeriods);
			setBudgetData(loadedBudgetData);
			setBudgetSettings({
				income: monthIncome || defaultIncome,
				outgoing: monthOutgoing || defaultOutgoing,
				defaultIncome: defaultIncome || 0,
				defaultOutgoing: defaultOutgoing || 0,
			});
		};

		fetchData(transformData, {
			url: `REMOVED_FIREBASE_DATABASE_URL://removed-firebase-host.invalid/budgeteer/${authCtx.userId}.json`,
		});
	}, [year, month]);

	// add transactions handler
	const handlerAddTransaction = (year, month, data) => {
		authCtx.authorize();

		const getId = res => {
			const newTransaction = {
				[res.name]: { name: data.name, value: data.value },
			};

			const updatedBudget = { ...budgetData };
			if (updatedBudget.transactions) {
				Object.assign(updatedBudget.transactions, newTransaction);
			} else {
				updatedBudget.transactions = newTransaction;
			}
			setBudgetData(updatedBudget);
		};

		fetchDataAdd(getId, {
			url: `REMOVED_FIREBASE_DATABASE_URL://removed-firebase-host.invalid/budgeteer/${authCtx.userId}/budget/${year}/${month}/transactions.json`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: { ...data },
		});
	};

	// remove transaction handler
	const handlerRemoveTransaction = id => {
		fetchDataRemove(null, {
			url: `REMOVED_FIREBASE_DATABASE_URL://removed-firebase-host.invalid/budgeteer/${authCtx.userId}/budget/${year}/${month}/transactions/${id}.json`,
			method: 'DELETE',
		});

		const updatedBudget = { ...budgetData };
		delete updatedBudget.transactions[id];
		setBudgetData(updatedBudget);
	};

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
				{
					type: 'link',
					url: '/logout',
					title: <AiOutlineLogout />,
					style: 'icon',
				},
			]}
		>
			<BudgetForm
				addTransaction={handlerAddTransaction}
				budgetPeriods={budgetPeriods}
				budgetSettings={budgetSettings}
				setYear={setYear}
				setMonth={setMonth}
				currYear={year}
				currMonth={month}
				budgetData={budgetData}
			/>
			{isLoading ? (
				'Loading data...'
			) : (
				<BudgetList
					budgetData={budgetData}
					removeTransaction={handlerRemoveTransaction}
				/>
			)}
		</Page>
	);
};

export default Budget;
