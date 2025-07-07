import { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:4000/api/auth';
function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    console.log('Login handler called');
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });
      localStorage.setItem('token', res.data.token); // store JWT
      onSuccess(); // callback to update auth state
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;