# Circle Wallet dApp – Frontend

A **Next.js + Tailwind CSS** frontend for a blockchain wallet dApp using **Circle's Developer-Controlled Wallets** on **Polygon Amoy testnet**.

Users can:

- Sign up / log in (JWT)
- View **USDC balance** and **wallet address**
- Send **0.01 USDC** to a fixed address
- Log out securely

---

## Features

| Feature                          | Status |
| -------------------------------- | ------ |
| Responsive UI with Tailwind      | Done   |
| JWT Authentication               | Done   |
| Auto-redirect on login           | Done   |
| Protected Dashboard              | Done   |
| Logout Button                    | Done   |
| Real-time balance (USDC + MATIC) | Done   |

---

## Tech Stack

- **Next.js 14** (App Router not used – `pages/` directory)
- **TypeScript**
- **Tailwind CSS**
- **Axios** for API calls
- **localStorage** for JWT

---

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── index.tsx         → Home (Sign Up / Log In)
│   │   ├── signup.tsx
│   │   ├── login.tsx
│   │   ├── dashboard.tsx     → Wallet + Send USDC
│   │   └── _app.tsx
│   ├── components/
│   │   └── WalletCard.tsx
│   └── styles/
│       └── globals.css
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Setup

### 1. Clone & Install

```bash
cd frontend
npm install
```

2. Environment
   No .env needed. Backend URL is hardcoded to http://localhost:5000.

For production: use NEXT_PUBLIC_API_URL

3. Run

```bash
npm run dev
```

Open: http://localhost:3000

---

## Pages

| Feature | Status |
| ------- | ------ |

Route,Description
/ | Home – Sign Up / Log In
/signup | Create account + auto-create Circle wallet
/login | Log in with email/password
/dashboard | "View wallet, USDC balance, send 0.01 USDC"

---

## Faucets (Testnet)

After signup:

Get MATIC: https://faucet.polygon.technology
Get USDC: https://faucet.circle.com

Paste your wallet address from Dashboard.

## Logout

Click "Log Out" on Dashboard or Home
JWT removed → redirected to /
