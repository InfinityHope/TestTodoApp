import styles from './AddTodo.module.scss'

const AddTodo = ({ title, onChangeTitle, addTodo }) => {
	return (
		<div className={styles.addTodo}>
			<input
				value={title}
				onChange={onChangeTitle}
				type="text"
				placeholder={'Введите название задачи'}
			/>
			<button onClick={addTodo}>Добавить задачу</button>
		</div>
	)
}

export default AddTodo
