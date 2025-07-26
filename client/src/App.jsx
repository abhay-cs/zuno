import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import TaskyLanding from './pages/TaskyLanding';
import Auth from './pages/AuthPage';
import TaskList from './pages/TaskList';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const handleAuth = () => {
		setIsAuthenticated(true);
	};

	const handleLogout = () => {
		setIsAuthenticated(false);
		localStorage.removeItem('token');
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<TaskyLanding />} />

				<Route
					path="/auth/*"
					element={
						isAuthenticated ? <Navigate to="/tasks" replace /> : <Auth onAuth={handleAuth} />
					}
				/>
				<Route
					path="/tasks"
					element={
						isAuthenticated ? (
							<TaskList onLogout={handleLogout} />
						) : (
							<Navigate to="/auth/login" replace />
						)
					}
				/>
				{/* Catch-all route to redirect unknown paths */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;