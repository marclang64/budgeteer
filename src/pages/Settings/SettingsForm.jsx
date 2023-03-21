import { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '@context/auth-context';
import useFetch from '@hooks/useFetch';

import { Form, Input, Button } from '@components/Form/';

import classes from './SettingsForm.module.scss';

const SettingsForm = () => {
	const authCtx = useContext(AuthContext);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [isLoading, error, fetchData] = useFetch();
	const [isLoadingUpdate, errorUpdate, fetchDataUpdate] = useFetch();
	const [settings, setSettings] = useState({});
	const inputIncome = useRef();
	const inputOutgoing = useRef();

	useEffect(() => {
		authCtx.authorize();

		// callback for fetched data
		const transformData = data => {
			const defaultIncome = data.defaultIncome || 0;
			const defaultOutgoing = data.defaultOutgoing || 0;

			setSettings({ income: defaultIncome, outgoing: defaultOutgoing });
		};

		fetchData(transformData, {
			url: `REMOVED_FIREBASE_DATABASE_URL://removed-firebase-host.invalid/budgeteer/${authCtx.userId}.json`,
		});
	}, [fetchData, formSubmitted]);

	const handlerSubmit = e => {
		e.preventDefault();
		authCtx.authorize();

		const income = parseInt(inputIncome.current.value);
		const outgoing = parseInt(inputOutgoing.current.value);

		// add transactions handler
		fetchDataUpdate(() => {}, {
			url: `REMOVED_FIREBASE_DATABASE_URL://removed-firebase-host.invalid/budgeteer/${authCtx.userId}.json`,
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: { defaultIncome: income, defaultOutgoing: outgoing },
		});

		setFormSubmitted(true);
	};

	return (
		<Form onSubmit={handlerSubmit}>
			{formSubmitted ? (
				<div className={classes.message}>
					Settings updated successfully
				</div>
			) : null}
			<Input
				label="Monthly Income"
				type="text"
				name="income"
				ref={inputIncome}
				defaultValue={settings.income}
			/>
			<Input
				label="Monthly Expenses"
				type="text"
				name="outoing"
				ref={inputOutgoing}
				defaultValue={settings.outgoing}
			/>

			<Button type="submit">Save</Button>
		</Form>
	);
};

export default SettingsForm;
