import React, { useState, useEffect } from 'react';
import { Check, Users, Zap, Shield, ArrowRight, Menu, X, Star, Play, CheckCircle, Clock, Target } from 'lucide-react';
import logo from '../assets/logo_2.png';
const TaskyLanding = ({ onLogin, onSignup }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);
    const [isVisible, setIsVisible] = useState({});

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[data-animate]').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Auto-rotate feature showcase
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature(prev => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: <Users className="w-8 h-8" />,
            title: "Team Collaboration",
            description: "Share tasks, assign work, and collaborate in real-time with your team members."
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Lightning Fast",
            description: "Built for speed with instant updates and smooth interactions across all devices."
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Secure & Private",
            description: "Your data is encrypted and secure. Focus on productivity, not privacy concerns."
        }
    ];


    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3 min-w-0">
                            {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg"> */}
                            {/* <span className="text-white font-bold text-lg">
                                    
                                </span> */}
                            <img
                                src={logo}
                                alt="Zuno Logo"
                                className="w-auto h-16 px-0 py-2" // adjust size as needed
                            />

                            <span className="text-3xl font-bold text-[#194C3E]">
                                Zuno
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8 flex-shrink-0">
                            {/* <button className="text-[#1E4C3F] px-6 py-2 rounded-lg hover:bg-[#266E4B] hover:text-[#97DBB1] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-medium" onClick={onLogin}>Login</button> */}
                            <button className="bg-[#95D9AB] text-[#1E4C3F] px-6 py-2 rounded-lg hover:bg-[#266E4B] hover:text-[#97DBB1] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-medium" onClick={onSignup}>
                                Start Now
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center space-x-3 flex-shrink-0">
                            {/* <button className="text-[#1E4C3F] px-6 py-2 rounded-lg hover: transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-medium" onClick={onLogin}>Login</button> */}
                            <button className="bg-[#95D9AB] text-[#1E4C3F] px-6 py-2 rounded-lg hover:bg-[#266E4B] hover:text-[#97DBB1] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-medium" onClick={onSignup}>
                                Start Now
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-[#98DCB0] via-[#76C19D] to-[#194C3E] to-[#76C19D] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className={`transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} id="hero" data-animate>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                <span className="text-[#20704B]">
                                    Smart,
                                </span>
                                <span className="bg-gradient-to-r from-[#C7EDD8] to-[#98DCB0] bg-clip-text text-transparent block">
                                    simple teamwork.
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Organize tasks, collaborate easily, and get more done with Zuno — built for modern teams.
                            </p>
                            {/* <div className="flex flex-col items-center">
                                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-[#98DCB0] hover:text-[#98DCB0] transition-all flex items-center justify-center space-x-2 text-lg">
                                    <Play size={20} />
                                    <span className='bg-gradient-to-r from-[#C7EDD8] to-[#98DCB0] bg-clip-text text-transparent'>Watch Demo</span>
                                </button>
                            </div> */}
                        </div>

                        <div className={`relative transition-all duration-1000 delay-300 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            {/* App Preview Mockup */}
                            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform hover:scale-105 transition-transform duration-500">
                                <div className="bg-gray-100 p-4 flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="p-6 bg-gradient-to-br from-blue-50 to-white">
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 flex items-center space-x-3 animate-pulse">
                                            <div className="w-5 h-5 bg-blue-500 rounded border-2 border-blue-500 flex items-center justify-center">
                                                <Check size={12} className="text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">Design new landing page</div>
                                                <div className="text-sm text-gray-500 flex items-center space-x-4 mt-1">
                                                    <span>Due today</span>
                                                    <div className="flex -space-x-1">
                                                        <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white"></div>
                                                        <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500 flex items-center space-x-3">
                                            <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">Review pull requests</div>
                                                <div className="text-sm text-gray-500">Due tomorrow</div>
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500 flex items-center space-x-3 opacity-60">
                                            <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">Plan sprint meeting</div>
                                                <div className="text-sm text-gray-500">Due next week</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                                <Users size={24} />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                                <CheckCircle size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-10">

                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} id="features" data-animate>
                        <h2 className="text-4xl font-bold text-[#20704B] mb-4">Everything you need to stay organized</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Powerful features designed to help you and your team accomplish more, together.
                        </p>
                    </div>

                    <div className="px-3 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${activeFeature === index ? 'ring-2 ring-[#76C19D] ring-opacity-50' : ''
                                    }`}
                            >
                                <div className={`text-[#76C19D] mb-4 p-3 rounded-xl inline-block ${activeFeature === index ? 'bg-[#76C19D]-100' : 'bg-gray-50'
                                    } transition-colors`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Feature Grid */}
                    
                    <div className='mt-10 pt-10 pb-20 px-4 bg-gradient-to-br from-[#98DCB0] via-[#76C19D] to-[#194C3E] to-[#76C19D] '>

                        <div className="grid md:grid-cols-2 gap-12 mt-20">
                            <div className="bg-gradient-to-br from-[#E6FAEF] to-[#C7EDD8] rounded-2xl p-8 space-y-8">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-200 p-3 rounded-lg">
                                        <Target className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Task Organization</h3>
                                        <p className="text-gray-600">Organize tasks with priorities, due dates, and custom filters to stay focused on what matters most.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-200 p-3 rounded-lg">
                                        <Clock className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Collaboration</h3>
                                        <p className="text-gray-600">Work together seamlessly with instant updates, comments, and shared task lists.</p>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 pt-6">
                                <span className='bg-gradient-to-r from-[#C7EDD8] to-[#98DCB0] bg-clip-text text-transparent block pt-8 pl-50'>
                                    All-in-one 
                                    
                                </span>
                                <span className='bg-gradient-to-r from-[#C7EDD8] to-[#98DCB0] bg-clip-text text-transparent block pl-30'>task platform</span>
                            </h2>
                           
                        </div>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-white-300 text-white py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center">
                        <img
                            src={logo}
                            alt="Zuno Logo"
                            className="w-auto h-16 py-2" // adjust size as needed
                        />
                        {/* </div> */}
                        <span className="text-3xl font-bold text-[#194C3E] mr-2 px-2">
                            Zuno
                        </span>
                        {/* <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                                    <p>&copy; 2025 Zuno. All rights reserved.</p>
                                </div> */}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TaskyLanding;