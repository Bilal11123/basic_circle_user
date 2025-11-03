const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const circle = require('../utils/circleClient');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// GET wallet info (USDC + native)
router.get('/wallet', authenticate, asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const response = await circle.getWalletTokenBalance({ id: user.walletId });
  const balances = response.data?.tokenBalances || [];

  const usdc = balances.find(t => t.token?.symbol === 'USDC');
  const native = balances.find(t => t.token?.isNative);

  res.json({
    walletAddress: user.walletAddress,
    tokenBalance: usdc?.amount || '0',
    tokenId: usdc?.token?.id || null,
    nativeBalance: native?.amount || '0',
  });
}));

// POST transfer 0.01 USDC
router.post('/transfer', authenticate, asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const balanceRes = await circle.getWalletTokenBalance({ id: user.walletId });
  const balances = balanceRes.data?.tokenBalances || [];

  const usdcToken = balances.find(t => t.token?.symbol === 'USDC' );
  if (!usdcToken) return res.status(400).json({ error: 'USDC not found in wallet' });

  const amount = parseFloat(usdcToken.amount);
  if (amount < 0.01) return res.status(400).json({ error: 'Insufficient USDC balance' });

  await circle.createTransaction({
    walletId: user.walletId,
    tokenId: usdcToken.token.id,
    destinationAddress: '0x888b9c6efe6782f4df750bbfa02d81c63d216aab',
    amounts: ['0.01'],
    fee: { type: 'level', config: { feeLevel: 'MEDIUM' } },
  });

  res.json({ message: 'Transfer successful' });
}));

module.exports = router;