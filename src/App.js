import Header from './components/Header'
import Split from 'react-split'
import TodoList from './components/TodoList'
import Interaction from './components/Interaction'
import { useEffect, useState } from 'react'
import axios from 'axios'
import AddTodo from './components/AddTodo/AddTodo'

function App() {
	//задачи
	const [todos, setTodos] = useState([])
	//создание
	const [title, setTitle] = useState('')
	//выбор задачи
	const [selectedTodo, setSelectedTodo] = useState(null)
	//поиск
	const [searchValue, setSearchValue] = useState('')
	//редактирование
	const [newTitle, setNewTitle] = useState('')
	const [status, setStatus] = useState(null)

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await axios.get(
					'https://6304ffa594b8c58fd729e752.mockapi.io/todos'
				)
				setTodos(data)
			} catch (e) {
				throw e
			}
		})()
	}, [])

	//Выбор задачи для панели редактирования
	const selectTodo = (obj) => {
		setSelectedTodo(obj)
	}

	//Удаление задачи
	const deleteTodo = async (id) => {
		try {
			await axios.delete(
				`https://6304ffa594b8c58fd729e752.mockapi.io/todos/${id}`
			)
			const newTodos = todos.filter((todo) => todo.id !== id)
			setTodos(newTodos)
			setSelectedTodo(null)
		} catch (e) {
			throw e
		}
	}

	//Редактирование задача
	const editTodo = async () => {
		try {
			const { data } = await axios.put(
				`https://6304ffa594b8c58fd729e752.mockapi.io/todos/${selectedTodo.id}`,
				{ ...selectedTodo, title: newTitle, status }
			)
			setTodos((prevState) =>
				prevState.map((item) =>
					item.id === selectedTodo.id
						? { ...item, title: newTitle, status }
						: item
				)
			)
			setSelectedTodo(data)
			setNewTitle('')
		} catch (e) {
			throw e
		}
	}

	//Изменение статуса задачи
	const changeStatus = (e) => {
		setStatus(+e.target.value)
	}

	//Очистка названия задачи (создание)
	const clearTitle = () => {
		setTitle('')
	}

	//Обработчик для изменения значения заголовка (поиск)
	const onChangeSearchValue = (e) => {
		setSearchValue(e.target.value)
	}

	//Обработчик для изменения значения заголовка (создание)
	const onChangeTitle = (e) => {
		setTitle(e.target.value)
	}

	//Добавление задачи
	const addTodo = async () => {
		const newTodo = {
			id: Math.random(),
			title,
			status: 1
		}

		try {
			setTodos((prevState) => [...prevState, newTodo])
			clearTitle()
			await axios.post(
				'https://6304ffa594b8c58fd729e752.mockapi.io/todos',
				newTodo
			)
		} catch (e) {
			throw e
		}
	}

	return (
		<>
			<Header
				searchValue={searchValue}
				onChangeSearchValue={onChangeSearchValue}
			/>
			<div className="container">
				<Split
					sizes={[15, 85]}
					minSize={320}
					expandToMin={false}
					gutterSize={5}
					snapOffset={30}
					dragInterval={1}
					direction="horizontal"
					cursor="col-resize"
					className={'app'}
					style={{ display: 'flex' }}
				>
					<TodoList
						todos={todos}
						searchValue={searchValue}
						selectTodo={selectTodo}
					/>
					<Interaction
						selectedTodo={selectedTodo}
						deleteTodo={deleteTodo}
						setStatus={setStatus}
						setNewTitle={setNewTitle}
						newTitle={newTitle}
						editTodo={editTodo}
						status={status}
						changeStatus={changeStatus}
					/>
				</Split>
				<AddTodo
					addTodo={addTodo}
					title={title}
					onChangeTitle={onChangeTitle}
				/>
			</div>
		</>
	)
}

export default App
