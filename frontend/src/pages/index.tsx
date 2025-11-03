import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-10 bg-white rounded-xl shadow-lg max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Circle Wallet dApp</h1>
        <p className="text-gray-600 mb-8">Get your own Polygon Amoy wallet with USDC</p>
        <div className="space-x-4">
          <Link href="/signup">
            <a className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition">
              Sign Up
            </a>
          </Link>
          <Link href="/login">
            <a className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition">
              Log In
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}