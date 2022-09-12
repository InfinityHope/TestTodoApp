import styles from './Select.module.scss'

const Index = ({ label, value, onChange, options }) => {
	const htmlFor = `${label}-${Math.random()}`
	return (
		<div className={styles.select}>
			<label htmlFor={htmlFor}>{label}</label>
			<select id={htmlFor} value={value} onChange={onChange}>
				{options.map((option, index) => {
					return (
						<option value={option.code} key={option.value + index}>
							{option.value}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default Index
