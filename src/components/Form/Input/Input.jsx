import { forwardRef } from 'react';
import classes from './Input.module.scss';

const Input = forwardRef((props, ref) => {
	const { label, ...properties } = props;

	return (
		<div className={classes.inputcontainer}>
			<input
				className={classes.input}
				id={label}
				ref={ref}
				placeholder=" "
				{...properties}
			/>
			<label className={classes.label} htmlFor={label}>
				{label}
			</label>
		</div>
	);
});

export default Input;
