import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/Signup'; // ✅ fixed casing

function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <LoginForm onSuccess={onAuth} />
      ) : (
        <SignupForm onSuccess={onAuth} />
      )}
      <p>
        {isLogin ? 'New here?' : 'Already have an account?'}{' '}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign up' : 'Log in'}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;