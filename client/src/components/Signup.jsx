import { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:4000/api/auth';
function SignupForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    console.log('📨 Submitting signup form...');
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/signup`, { email, password });
      console.log('✅ Signup success:', res.data);

      localStorage.setItem('token', res.data.token);
      onSuccess();
    } catch (err) {
      console.error('❌ Signup failed:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
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
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;