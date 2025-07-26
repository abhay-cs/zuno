import { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Check, X, AlertCircle } from 'lucide-react';
import logo from "../assets/logo_2.png"
const API_BASE = 'http://localhost:4000/api/auth';

function LoginForm({ onSuccess }) {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: ''
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email';
		}
		if (!formData.password) {
			newErrors.password = 'Password is required';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		setIsLoading(true);
		try {
			const res = await axios.post(`${API_BASE}/login`, formData);
			localStorage.setItem('token', res.data.token);
			onSuccess();
		} catch (err) {
			setErrors({ api: err.response?.data?.error || 'Login failed' });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center space-x-3 mb-6">
						{/* <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#26885B' }}>
							<span className="text-white font-bold text-xl">T</span>
						</div> */}
						<img
							src={logo}
							alt="Zuno Logo"
							className="w-auto h-16 px-0 py-2" // adjust size as needed
						/>
						<span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
							Zuno
						</span>
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
					<p className="text-gray-600">Sign in to continue to your tasks</p>
				</div>

				{/* Login Card */}
				<form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
					<div className="space-y-6">
						{/* Email Field */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Email Address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.email
										? 'border-red-300 focus:ring-red-500 focus:border-red-500'
										: 'border-gray-300 focus:ring-green-500 focus:border-green-500'
										}`}
									placeholder="Enter your email"
									style={{ '--tw-ring-color': '#26885B' }}
								/>
								{errors.email && (
									<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
										<AlertCircle className="h-5 w-5 text-red-500" />
									</div>
								)}
							</div>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600 flex items-center">
									<X size={16} className="mr-1" />
									{errors.email}
								</p>
							)}
						</div>

						{/* Password Field */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type={showPassword ? 'text' : 'password'}
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.password
										? 'border-red-300 focus:ring-red-500 focus:border-red-500'
										: 'border-gray-300 focus:ring-green-500 focus:border-green-500'
										}`}
									placeholder="Enter your password"
									style={{ '--tw-ring-color': '#26885B' }}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									) : (
										<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									)}
								</button>
							</div>
							{errors.password && (
								<p className="mt-1 text-sm text-red-600 flex items-center">
									<X size={16} className="mr-1" />
									{errors.password}
								</p>
							)}
						</div>

						{/* Remember Me / Forgot Password */}
						<div className="flex items-center justify-between">
							{/* <label className="flex items-center">
								<input
									type="checkbox"
									className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
									style={{ accentColor: '#26885B' }}
								/>
								<span className="ml-2 text-sm text-gray-600">Remember me</span>
							</label> */}
							{/* still needs to implement this.. */}
							{/* <button
								type="button"
								className="text-sm font-medium hover:underline"
								style={{ color: '#26885B' }}
							>
								Forgot password?
							</button> */}
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-gradient-to-r text-white py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
							style={{
								background: isLoading
									? '#98DCB0'
									: 'linear-gradient(135deg, #26885B 0%, #20704B 100%)'
							}}
						>
							{isLoading ? (
								<>
									<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
									<span>Signing in...</span>
								</>
							) : (
								<>
									<span>Sign In</span>
									<ArrowRight size={20} />
								</>
							)}
						</button>
						{errors.api && (
							<p className="mt-2 text-sm text-red-600 flex items-center">
								<X size={16} className="mr-1" />
								{errors.api}
							</p>
						)}
					</div>

					{/* Divider */}
					{/* <div className="my-6 flex items-center">
						<div className="flex-1 border-t border-gray-300"></div>
						<span className="px-4 text-sm text-gray-500">or</span>
						<div className="flex-1 border-t border-gray-300"></div>
					</div> */}
					{/* <div>
						<p className="">
							Don’t have an account?{' '}
							<Link to="/auth/signup" className="text-[#20704B] hover:underline font-medium">
								Sign up
							</Link>
						</p>
						
					</div> */}
					
				</form>
							
			</div>
			
		</div>
	);
}

export default LoginForm;