import { useRef } from 'react';

import { IoIosAdd } from 'react-icons/io';
import { RxEnter, RxExit } from 'react-icons/rx';
import { FaBalanceScale } from 'react-icons/fa';
import classes from './BudgetForm.module.scss';

const BudgetForm = props => {
	const inputYear = useRef();
	const inputMonth = useRef();
	const inputName = useRef();
	const inputValue = useRef();
	const inputIncome = useRef();
	const inputOutgoing = useRef();

	const handlerSetYear = () => {
		props.setYear(inputYear.current.value);
	};

	const handlerSetMonth = () => {
		props.setMonth(inputMonth.current.value);
	};

	const calculateBalance = transactions => {
		const income = Number(props.budgetSettings.income) || 0;
		const outgoing = Number(props.budgetSettings.outgoing) || 0;
		const expenses = Object.values(transactions || {}).reduce(
			(sum, transaction) => sum + (Number(transaction.value) || 0), 0
		);
		const total = Math.round((income - outgoing - expenses) * 100) / 100;
		return `${total < 0 ? '-' : ''}$${Math.abs(total).toFixed(2)}`;
	};

	const balance = calculateBalance(props.budgetData.transactions);
	const handlerIncomeUpdate = e => props.updateAmounts(Number(e.target.value), Number(props.budgetSettings.outgoing) || 0);
	const handlerOutgoingUpdate = e => props.updateAmounts(Number(props.budgetSettings.income) || 0, Number(e.target.value));

	const handlerSubmit = e => {
		e.preventDefault();
		const year = inputYear.current.value;
		const month = inputMonth.current.value;
		const name = inputName.current.value;
		const value = Number(inputValue.current.value);

		if (year && month && name.trim() && Number.isFinite(value) && value > 0) {
			const newTransaction = {
				name: name.trim(),
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
						min="0.01" step="0.01" required
						autoComplete="off"
					/>
				</div>
				<input
					type="text"
					name="name"
					ref={inputName}
					placeholder="Chocolate Cake"
						required maxLength="120"
					autoComplete="off"
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
						min="0" step="0.01"
						ref={inputIncome}
						value={props.budgetSettings.income}
						placeholder={props.budgetSettings.defaultIncome}
						onChange={handlerIncomeUpdate}
						autoComplete="off"
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
						min="0" step="0.01"
						ref={inputOutgoing}
						value={props.budgetSettings.outgoing}
						placeholder={props.budgetSettings.defaultOutgoing}
						onChange={handlerOutgoingUpdate}
						autoComplete="off"
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
