import Joi from "joi";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.scss";

const TextField = ({
	label,
	error,
	handleInputState,
	handleErrorState,
	schema,
	focus,
	...rest
}) => {
	const validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const inputSchema = Joi.object({ [name]: schema });
		const { error } = inputSchema.validate(obj);
		return error ? error.details[0].message : "";
	};

	const handleChange = ({ currentTarget: input }) => {
		if (schema) {
			const errorMessage = validateProperty(input);
			if (handleErrorState) handleErrorState(input.name, errorMessage);
		}
		// console.log(input.name);
		// console.log(input.value);
		handleInputState(input.name, input.value);
	};

	return (
		<div className={styles.container}>
			<p className={styles.label}>{label}</p>
			<input
				{...rest}
				onChange={handleChange}
				autoFocus={focus}
				className={
					error ? `${styles.input} ${styles.error}` : `${styles.input} `
				}
			/>
			{error && (
				<p className={styles.error_msg}>
					<ClearIcon /> {error}
				</p>
			)}
		</div>
	);
};

export default TextField;
