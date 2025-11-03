# Circle Wallet dApp – Backend

A **Node.js + Express + MongoDB** backend for managing **Circle Developer-Controlled Wallets** on **Polygon Amoy**.

Handles:

- User signup/login (JWT + bcrypt)
- Auto-create Circle wallet on signup
- Fetch USDC + MATIC balance
- Transfer **0.01 USDC** to fixed address
- Full error handling & validation

---

## Features

| Feature                   | Status |
| ------------------------- | ------ |
| JWT Authentication        | Done   |
| Password Hashing (bcrypt) | Done   |
| Circle SDK Integration    | Done   |
| Auto wallet creation      | Done   |
| USDC-specific transfer    | Done   |
| Global error handling     | Done   |
| Async wrapper             | Done   |
| 404 & JWT middleware      | Done   |

---

## Tech Stack

- **Node.js**
- **Express**
- **MongoDB** (Mongoose)
- **JWT** + **bcryptjs**
- **Circle SDK** (`@circle-fin/developer-controlled-wallets`)
- **dotenv**

---

## Project Structure

```
backend/
├── .env
├── server.js
├── models/
│   └── User.js
├── routes/
│   ├── auth.js      → /signup, /login
│   └── wallet.js    → /wallet, /transfer
├── middleware/
│   ├── asyncHandler.js
│   └── errorHandler.js
├── utils/
│   └── circleClient.js
└── package.json
```

---

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create .env

CIRCLE_API_KEY=TEST_API_KEY:your_id:your_secret
ENTITY_SECRET=your_64_char_hex_secret
WALLET_SET_ID=walletset_your_id_here
MONGODB_URI=mongodb://127.0.0.1:27017/circle-dapp
JWT_SECRET=your_strong_secret_here

Get keys from: https://app.circle.com

### 3. Start MongoDB

```bash
mongod
```

### 4. Run Server

```bash
node server.js
```

Server runs on: http://localhost:5000

---

## API Endpoints

| Method | Endpoint      | Auth | Description                 |
| ------ | ------------- | ---- | --------------------------- |
| POST   | /api/signup   | No   | Create user + Circle wallet |
| POST   | /api/login    | No   | Login → JWT                 |
| GET    | /api/wallet   | Yes  | Get USDC + MATIC balance    |
| POST   | /api/transfer | Yes  | Send 0.01 USDC              |

---

## Circle Integration

- Uses Developer-Controlled Wallets
- Blockchain: MATIC-AMOY
- Token: USDC (6 decimals)
- Gas: Paid in MATIC (native)

## Error Handling

- Global error middleware
- Circle API errors → user-friendly messages
- JWT validation
- Input validation

## Security

- Passwords hashed with bcrypt
- JWT signed with HS256
- JWT stored in localStorage (frontend)
- Protected routes with middleware
