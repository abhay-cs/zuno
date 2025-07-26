import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/Signup';


function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6FAEF] to-[#C7EDD8] ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-4 sm:space-y-5">
        {isLogin ? (
          <LoginForm onSuccess={onAuth} />
        ) : (
          <SignupForm onSuccess={onAuth} />
        )}
        <p className="text-center text-sm text-gray-600">
          {isLogin ? "New here?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#20704B] hover:underline font-medium"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;