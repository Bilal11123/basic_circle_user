const errorHandler = (err, req, res, next) => {
  console.error('ERROR:', err);

  if (err.name === 'ValidationError') {
    const msgs = Object.values(err.errors).map((v) => v.message);
    return res.status(400).json({ error: msgs.join(', ') });
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  if (err.response?.data) {
    const msg = err.response.data.message || 'Circle API error';
    return res.status(err.response.status || 500).json({ error: msg });
  }

  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};

module.exports = errorHandler;