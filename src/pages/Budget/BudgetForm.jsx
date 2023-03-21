import { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '@context/auth-context';
import useFetch from '@hooks/useFetch';

import { IoIosAdd } from 'react-icons/io';
import { RxEnter, RxExit } from 'react-icons/rx';
import { FaBalanceScale } from 'react-icons/fa';
import classes from './BudgetForm.module.scss';

const BudgetForm = props => {
	const authCtx = useContext(AuthContext);
	const [isLoading, error, fetchData] = useFetch();
	const [balance, setBalance] = useState(0);
	const inputYear = useRef();
	const inputMonth = useRef();
	const inputName = useRef();
	const inputValue = useRef();
	const inputIncome = useRef();
	const inputOutgoing = useRef();

	useEffect(() => {
		const transactions = props.budgetData.transactions;
		const income = props.budgetSettings.income;
		const outgoing = props.budgetSettings.outgoing;

		const total = calculateBalance(income, outgoing, transactions);
		setBalance(total);
	}, [props.budgetData]);

	const handlerSetYear = () => {
		props.setYear(inputYear.current.value);
	};

	const handlerSetMonth = () => {
		props.setMonth(inputMonth.current.value);
	};

	const calculateBalance = (income, outgoing, transactions) => {
		income ||= 0;
		outgoing ||= 0;
		transactions ||= [];

		let expenses = 0;

		for (const key in transactions) {
			expenses += parseInt(transactions[key].value);
		}

		let total = income - outgoing - expenses;
		total = total < 0 ? `-$${Math.abs(total)}` : `$${total}`;
		return total;
	};

	const handlerSettingsUpdate = () => {
		const income = parseInt(inputIncome.current.value);
		const outgoing = parseInt(inputOutgoing.current.value);
		const transactions = props.budgetData.transactions;
		const year = props.currYear;
		const month = props.currMonth;

		// add transactions handler
		fetchData(() => {}, {
			url: `REMOVED_FIREBASE_DATABASE_URL://removed-firebase-host.invalid/budgeteer/${authCtx.userId}/budget/${year}/${month}.json`,
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: { income: income, outgoing: outgoing },
		});

		const total = calculateBalance(income, outgoing, transactions);
		setBalance(total);
	};

	const handlerSubmit = e => {
		e.preventDefault();
		const year = inputYear.current.value;
		const month = inputMonth.current.value;
		const name = inputName.current.value;
		const value = parseInt(inputValue.current.value);

		if (year && month && name && value) {
			const newTransaction = {
				name: name,
				value: value,
			};

			inputName.current.value = '';
			inputValue.current.value = '';

			props.addTransaction(year, month, newTransaction);
		}
	};

	return (
		<form className={classes.budgetform} onSubmit={handlerSubmit}>
			<div className={classes.inputfields}>
				<div className={classes.value}>
					<span>$</span>
					<input
						type="number"
						name="value"
						ref={inputValue}
						placeholder="10"
					/>
				</div>
				<input
					type="text"
					name="name"
					ref={inputName}
					placeholder="Chocolate Cake"
				/>
				<button type="submit">
					<IoIosAdd /> <span>Add</span>
				</button>
			</div>

			<div className={classes.calculator}>
				<div className={classes.income}>
					<label>
						<RxEnter />
						<span>Income:</span>
					</label>
					<span>$</span>
					<input
						type="number"
						name="income"
						ref={inputIncome}
						defaultValue={props.budgetSettings.income}
						placeholder={props.budgetSettings.defaultIncome}
						onChange={handlerSettingsUpdate}
					/>
				</div>
				<div className={classes.outgoing}>
					<label>
						<RxExit />
						<span>Expenses:</span>
					</label>
					<span>$</span>
					<input
						type="number"
						name="outgoing"
						ref={inputOutgoing}
						defaultValue={props.budgetSettings.outgoing}
						placeholder={props.budgetSettings.defaultOutgoing}
						onChange={handlerSettingsUpdate}
					/>
				</div>
				<div className={classes.balance}>
					<label>
						<FaBalanceScale />
						<span>Balance:</span>
					</label>
					<div className={classes.amount}>{balance}</div>
				</div>
			</div>

			<div className={classes.periodselect}>
				<select
					value={props.currMonth}
					name="month"
					ref={inputMonth}
					onChange={handlerSetMonth}
				>
					<option value="01">January</option>
					<option value="02">February</option>
					<option value="03">March</option>
					<option value="04">April</option>
					<option value="05">May</option>
					<option value="06">June</option>
					<option value="07">July</option>
					<option value="08">August</option>
					<option value="09">September</option>
					<option value="10">October</option>
					<option value="11">November</option>
					<option value="12">December</option>
				</select>
				<select
					name="year"
					value={props.currYear}
					ref={inputYear}
					onChange={handlerSetYear}
				>
					{props.budgetPeriods.map(year => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
			</div>
		</form>
	);
};

export default BudgetForm;
