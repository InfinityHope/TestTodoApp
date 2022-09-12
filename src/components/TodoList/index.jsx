import styles from './TodoList.module.scss'

const TodoList = ({ todos, searchValue, selectTodo }) => {
	const renderTodos = (todos) => {
		const filteredTodos = todos.filter((todo) =>
			todo.title.toLowerCase().includes(searchValue.toLowerCase())
		)

		return filteredTodos.map((todo) => {
			let statusStyle = 'gray'

			switch (todo.status) {
				case 2: {
					statusStyle = 'blue'
					break
				}
				case 3: {
					statusStyle = 'green'
					break
				}
				default: {
					statusStyle = 'gray'
					break
				}
			}

			return (
				<li key={todo.id}>
					<span style={{ color: statusStyle }} onClick={() => selectTodo(todo)}>
						{todo.title}
					</span>
				</li>
			)
		})
	}

	return (
		<div className={styles.todoList}>
			<ul>
				{renderTodos(todos).length === 0
					? 'Заметок не найдено'
					: renderTodos(todos)}
			</ul>
		</div>
	)
}

export default TodoList
