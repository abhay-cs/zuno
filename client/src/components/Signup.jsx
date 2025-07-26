import { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, X, CheckCircle, AlertCircle } from 'lucide-react';
import logo from "../assets/logo_2.png"

const API_BASE = 'http://localhost:4000/api/auth';

function SignupForm({ onSuccess }) {

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
		if (!formData.name.trim()) {
			newErrors.name = 'Name is required';
		}
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email';
		}
		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters';
		}
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
		setIsLoading(true);
		try {
			const res = await axios.post(`${API_BASE}/signup`, {
				name: formData.name,
				email: formData.email,
				password: formData.password
			});
			localStorage.setItem('token', res.data.token);
			if (onSuccess) onSuccess();
		} catch (err) {
			setErrors({ api: err.response?.data?.error || 'Signup failed' });
		} finally {
			setIsLoading(false);
		}
	};

	const getPasswordStrength = (password) => {
		if (!password) return { strength: 0, text: '', color: '' };
		let strength = 0;
		if (password.length >= 8) strength++;
		if (/[A-Z]/.test(password)) strength++;
		if (/[a-z]/.test(password)) strength++;
		if (/[0-9]/.test(password)) strength++;
		if (/[^A-Za-z0-9]/.test(password)) strength++;
		const levels = [
			{ text: 'Very Weak', color: 'bg-red-500' },
			{ text: 'Weak', color: 'bg-orange-500' },
			{ text: 'Fair', color: 'bg-yellow-500' },
			{ text: 'Good', color: 'bg-green-400' },
			{ text: 'Strong', color: 'bg-green-600' }
		];
		return { strength, ...levels[Math.min(strength, 4)] };
	};

	const passwordStrength = getPasswordStrength(formData.password);

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center space-x-3 mb-6">
						<img
							src={logo}
							alt="Zuno Logo"
							className="w-auto h-16 px-0 py-2" // adjust size as needed
						/>
						<span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
							Zuno
						</span>
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
					<p className="text-gray-600">Get started with your free account</p>
				</div>

				{/* Signup Card */}
				<form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
					<div className="space-y-6">
						{/* Name Field */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Full Name
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<User className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.name
										? 'border-red-300 focus:ring-red-500 focus:border-red-500'
										: 'border-gray-300 focus:ring-green-500 focus:border-green-500'
										}`}
									placeholder="Enter your full name"
									style={{ '--tw-ring-color': '#26885B' }}
								/>
								{errors.name && (
									<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
										<AlertCircle className="h-5 w-5 text-red-500" />
									</div>
								)}
							</div>
							{errors.name && (
								<p className="mt-1 text-sm text-red-600 flex items-center">
									<X size={16} className="mr-1" />
									{errors.name}
								</p>
							)}
						</div>

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
									placeholder="Create a strong password"
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

							{/* Password Strength */}
							{formData.password && (
								<div className="mt-2">
									<div className="flex items-center space-x-2 mb-1">
										<div className="flex-1 bg-gray-200 rounded-full h-2">
											<div
												className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
												style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
											/>
										</div>
										<span className="text-xs text-gray-600">{passwordStrength.text}</span>
									</div>
									<div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
										<div className={`flex items-center space-x-1 ${formData.password.length >= 8 ? 'text-green-600' : ''}`}>
											{formData.password.length >= 8 ? <Check size={12} /> : <X size={12} />}
											<span>8+ characters</span>
										</div>
										<div className={`flex items-center space-x-1 ${/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'text-green-600' : ''}`}>
											{/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? <Check size={12} /> : <X size={12} />}
											<span>Upper & lowercase</span>
										</div>
										<div className={`flex items-center space-x-1 ${/[0-9]/.test(formData.password) ? 'text-green-600' : ''}`}>
											{/[0-9]/.test(formData.password) ? <Check size={12} /> : <X size={12} />}
											<span>Number</span>
										</div>
										<div className={`flex items-center space-x-1 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : ''}`}>
											{/[^A-Za-z0-9]/.test(formData.password) ? <Check size={12} /> : <X size={12} />}
											<span>Special character</span>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Confirm Password Field */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Confirm Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={handleInputChange}
									className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.confirmPassword
										? 'border-red-300 focus:ring-red-500 focus:border-red-500'
										: 'border-gray-300 focus:ring-green-500 focus:border-green-500'
										}`}
									placeholder="Confirm your password"
									style={{ '--tw-ring-color': '#26885B' }}
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
								>
									{showConfirmPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									) : (
										<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									)}
								</button>
								{formData.confirmPassword && formData.password === formData.confirmPassword && (
									<div className="absolute inset-y-0 right-10 pr-3 flex items-center">
										<CheckCircle className="h-5 w-5 text-green-500" />
									</div>
								)}
							</div>
							{errors.confirmPassword && (
								<p className="mt-1 text-sm text-red-600 flex items-center">
									<X size={16} className="mr-1" />
									{errors.confirmPassword}
								</p>
							)}
						</div>

						{/* Terms Agreement */}
						<div className="flex items-start space-x-2">
							<input
								type="checkbox"
								className="w-4 h-4 mt-0.5 text-green-600 border-gray-300 rounded focus:ring-green-500"
								style={{ accentColor: '#26885B' }}
							/>
							<p className="text-sm text-gray-600">
								I agree to the{' '}
								<button type="button" className="font-medium hover:underline" style={{ color: '#26885B' }}>
									Terms of Service
								</button>
								{' '}and{' '}
								<button type="button" className="font-medium hover:underline" style={{ color: '#26885B' }}>
									Privacy Policy
								</button>
							</p>
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
									<span>Creating account...</span>
								</>
							) : (
								<>
									<span>Create Account</span>
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
						
						<p className="text-sm text-gray-600 mt-6 text-center">
							Already have an account?{' '}
							<Link to="/auth/login" className="text-[#20704B] hover:underline font-medium">
								Log in
							</Link>
						</p>
					</div> */}
					{/* Social Login */}
					{/* <div className="space-y-3">
						<button className="w-full border border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors">
							<svg className="w-5 h-5" viewBox="0 0 24 24">
								<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
								<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
								<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
								<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
							</svg>
							<span className="text-gray-700">Continue with Google</span>
						</button>
						<button className="w-full border border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors">
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.996 1.482-1.996.699 0 1.037.219 1.037 1.142 0 .696-.219 1.738-.359 2.695-.199.937.478 1.717 1.397 1.717 1.674 0 2.955-1.765 2.955-4.318 0-2.258-1.620-3.838-3.932-3.838-2.681 0-4.254 2.008-4.254 4.082 0 .808.309 1.675.696 2.147.076.092.087.173.064.267-.07.292-.226.934-.257 1.066-.040.172-.132.211-.305.127-1.171-.547-1.906-2.257-1.906-3.632 0-2.974 2.161-5.704 6.233-5.704"/>
							</svg>
							<span className="text-gray-700">Continue with GitHub</span>
						</button>
					</div> */}
				</form>


			</div>
		</div>
	);
}

export default SignupForm;