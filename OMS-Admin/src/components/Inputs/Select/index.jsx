import styles from "./styles.module.scss";

const Select = ({
	label,
	options,
	value,
	handleInputState,
	placeholder,
	...rest
}) => {
	
	const handleChange = ({ currentTarget: input }) => {
		console.log(input.name, input.value);
		handleInputState(input.name, input.value);
	};

	return (
		<div className={styles.container}>
			<p className={styles.label}>{label}</p>
			<select
				value={value} 
				onChange={handleChange}
				{...rest}
				className={styles.select}
			>

				{/* <option style={{ display: "none" }} value="">
					{placeholder}	
				</option> */}

				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
