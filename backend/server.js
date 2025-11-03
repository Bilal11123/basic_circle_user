require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const walletRoutes = require('./routes/wallet');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', walletRoutes);

// 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (last)
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));