require('dotenv').config();
const { initiateDeveloperControlledWalletsClient } = require('@circle-fin/developer-controlled-wallets');

const circle = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.ENTITY_SECRET,
});

module.exports = circle;

// Add this at the bottom
// (async () => {
//   try {
//     console.log("CIRCLE_API_KEY",process.env.CIRCLE_API_KEY)
//     const res = await circle.createWallets({
//       blockchains: ['MATIC-AMOY'],
//       count: 1,
//       walletSetId: process.env.WALLET_SET_ID,
//     });
//     console.log('Wallet created:', res.data);
//   } catch (err) {
//     console.error('Circle Error:', err.response?.data || err.message);
//   }
// })();