import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import WalletCard from '../components/WalletCard';

interface WalletData {
  walletAddress: string;
  tokenBalance: string;
  nativeBalance: string;
}

export default function Dashboard() {
  const [data, setData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transferStatus, setTransferStatus] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }

    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/wallet', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load wallet');
        if (err.response?.status === 401) router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [router]);

  const handleTransfer = async () => {
    setTransferStatus('');
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:5000/api/transfer', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransferStatus(res.data.message);
      // Refresh balance
      const fresh = await axios.get('http://localhost:5000/api/wallet', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(fresh.data);
    } catch (err: any) {
      setTransferStatus(err.response?.data?.error || 'Transfer failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setTransferStatus('Logged out!');
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        {data && (
          <WalletCard
            address={data.walletAddress}
            usdc={data.tokenBalance}
            native={data.nativeBalance}
          />
        )}
        {/* Logout + Transfer Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleTransfer}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition"
          >
            Send 0.01 USDC
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition"
          >
            Log Out
          </button>
        </div>

        {transferStatus && (
          <p className={`mt-2 text-center ${
            transferStatus.includes('successful') ? 'text-green-600' : 'text-red-600'
          }`}>
            {transferStatus}
          </p>
        )}
        {transferStatus && (
          <p className={`mt-2 text-center ${
            transferStatus.includes('successful') ? 'text-green-600' : 'text-red-600'
          }`}>
            {transferStatus}
          </p>
        )}
      </div>
    </div>
  );
}