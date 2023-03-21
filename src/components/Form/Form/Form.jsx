import classes from './Form.module.scss';

const Form = props => {
	return (
		<form className={classes.form} {...props}>
			{props.children}
		</form>
	);
};

export default Form;
