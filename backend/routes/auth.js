const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const circle = require('../utils/circleClient');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

router.post('/signup', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const walletRes = await circle.createWallets({
    blockchains: ['MATIC-AMOY'],
    count: 1,
    walletSetId: process.env.WALLET_SET_ID,
  });

  const wallet = walletRes.data?.wallets?.[0];
  if (!wallet?.id || !wallet?.address) throw new Error('Wallet creation failed');

  const user = new User({
    email,
    hashedPassword,
    walletId: wallet.id,
    walletAddress: wallet.address,
  });
  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.hashedPassword);
  if (!match) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}));

module.exports = router;