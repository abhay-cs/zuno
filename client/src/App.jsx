import { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import TaskList from './pages/TaskList';
import './App.css';
import TaskyLanding from './pages/TaskyLanding';
function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [page, setPage] = useState('landing');
	useEffect(() => {
		const token = localStorage.getItem('token');
		if(token){
			setIsAuthenticated(!!token);
			setPage('tasks')
		}

	}, []);

	const handleAuth = () => {
		setIsAuthenticated(true);
		setPage('tasks');
	}

	const handleLogout = () => {
		setIsAuthenticated(false);
		setPage('landing')
	}

	if (page == 'landing'){
		return (
			<TaskyLanding
				onLogin={()=> setPage('auth')}
				onSignup={()=> setPage('auth')}
			/>
		);
	}
	if (!isAuthenticated) {
		return <AuthPage onAuth={handleAuth} />;
	}

	return <TaskList onLogout={handleLogout} />;
}

export default App;
