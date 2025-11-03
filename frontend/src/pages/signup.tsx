import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/signup', { email, password });
      localStorage.setItem('token', res.data.token);
      setSuccess('Signup successful! Redirecting...');
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <input
          type="email" placeholder="Email" required
          value={email} onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
        />
        <input
          type="password" placeholder="Password" required
          value={password} onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
        />
        <button
          type="submit" disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Sign Up'}
        </button>
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-3 text-center">{success}</p>}
      </form>
    </div>
  );
}