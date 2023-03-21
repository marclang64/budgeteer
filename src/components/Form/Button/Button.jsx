import classes from './Button.module.scss';

const Button = props => {
	const { style = 'primary', ...tags } = props;

	return (
		<button className={`${classes.button} ${classes[style]}`} {...tags}>
			{props.children}
		</button>
	);
};

export default Button;
