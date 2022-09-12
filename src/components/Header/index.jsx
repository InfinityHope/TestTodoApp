import styles from './Header.module.scss'

const Header = ({ onChangeSearchValue, searchValue }) => {
	return (
		<header className={styles.header}>
			<h1>Todo App</h1>
			<input
				type="text"
				placeholder={'Поиск по задачам'}
				value={searchValue}
				onChange={onChangeSearchValue}
			/>
		</header>
	)
}

export default Header
