interface Props {
  address: string;
  usdc: string;
  native: string;
}

export default function WalletCard({ address, usdc, native }: Props) {
  return (
    <div className="bg-gray-50 p-5 rounded-lg border">
      <p className="font-semibold text-sm text-gray-600">Wallet Address</p>
      <p className="text-xs break-all font-mono mb-3">{address}</p>

      <p className="font-semibold text-sm text-gray-600">USDC Balance</p>
      <p className="text-lg font-bold text-green-600">{usdc} USDC</p>

      <p className="font-semibold text-sm text-gray-600 mt-3">MATIC (gas)</p>
      <p className="text-sm">{native} MATIC</p>
    </div>
  );
}