import styles from './Interaction.module.scss'
import { useEffect } from 'react'
import Index from '../UI/Select'

const statusArr = [
	{
		code: 1,
		value: 'Ожидание'
	},
	{
		code: 2,
		value: 'В процессе'
	},
	{
		code: 3,
		value: 'Готово'
	}
]

const Interaction = ({
	selectedTodo,
	deleteTodo,
	setStatus,
	setNewTitle,
	newTitle,
	editTodo,
	status,
	changeStatus
}) => {
	useEffect(() => {
		if (selectedTodo) {
			setStatus(selectedTodo.status)
			setNewTitle(selectedTodo.title)
		}
	}, [selectedTodo, setNewTitle, setStatus])

	return (
		<div className={styles.interaction}>
			{selectedTodo && (
				<>
					<input
						type="text"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
					/>
					<Index
						label={'Выберите правильный ответ'}
						value={status || 1}
						onChange={changeStatus}
						options={statusArr}
					/>
					<div className={styles.btns}>
						<button onClick={() => editTodo()}>Редактировать</button>
						<button
							className={styles.delete}
							onClick={() => deleteTodo(selectedTodo.id)}
						>
							Удалить
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default Interaction
