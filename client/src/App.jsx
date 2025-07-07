import { useState, useEffect } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import { getTasks, createTask, deleteTask, updateTask } from './api/api'
import AuthPage from './pages/AuthPage';
// import TaskPage from './pages/TaskList';

function App() {
	const [tasks, setTasks] = useState([]);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		console.log('📦 token in App.jsx:', token);
		setIsAuthenticated(!!token);
	}, []);

	useEffect(() => {
		if (!isAuthenticated) return;

		console.log('📡 About to fetch tasks');

		getTasks()
			.then((res) => {
				console.log('✅ Tasks fetched:', res.data);
				setTasks(res.data);
			})
			.catch((err) => {
				console.error("❌ Error fetching tasks:", err.response?.status, err.message);
				console.log('🧵 Full error:', err);
				setIsAuthenticated(false);
				localStorage.removeItem('token');
			});
	}, [isAuthenticated]);

	const handleAuth = () => setIsAuthenticated(true);

	const handleAddTask = async (text) => {
		const res = await createTask(text);
		setTasks((prev) => [res.data, ...prev]);
	};

	const handleDeleteTask = async (taskId) => {
		// this is filtering out tasks based on id, rejecting the one that matches 
		await deleteTask(taskId);
		setTasks((prev) => prev.filter((task) => task._id !== taskId));
	}

	const handleEditTask = async (taskId, newText) => {
		const res = await updateTask(taskId, { text: newText });
		//fancy logic
		setTasks((prev) =>
			prev.map((task) =>
				task._id === taskId ? { ...task, text: res.data.text } : task
			)
		);
	}
	if (!isAuthenticated) {
		return <AuthPage onAuth={handleAuth} />;
	}

	return (
		<div>
			<div className='heading'>Tasky</div>
			<TaskForm onAdd={handleAddTask} />
			<ul>
				{tasks.map((task) => (
					<TaskItem
						key={task._id}
						task={task}
						onDelete={handleDeleteTask}
						onEdit={handleEditTask}
					/>
				))}
			</ul>
			<button
				onClick={() => {
					localStorage.removeItem('token');
					setIsAuthenticated(false);
					setTasks([]);
				}}
			>
				Logout
			</button>
		</div>
	);
}

export default App
