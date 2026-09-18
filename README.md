# MediShare 💊 — Decentralized Healthcare & Medicine Verification Platform

> **Project-Based Learning (PBL) Submission**  
> *A Web3 Smart-Contract-Powered Pharmaceutical Supply Chain Verification & Multimodal Gemini AI Healthcare Hub.*

[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636.svg)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-Ethereum%20EVM-yellow.svg)](https://hardhat.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF.svg)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express-4.21-000000.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248.svg)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Google%20Gemini-AI%20NLP-8E75B2.svg)](https://ai.google.dev/)

---

## 🌟 Executive Summary & Problem Statement

Counterfeit pharmaceuticals and opaque medicine supply chains present major global health hazards. Millions of patients ingest substandard or expired medications due to lack of verifiable authenticity at the point of dispensing. Furthermore, millions of dollars in unexpired surplus medicines are discarded annually instead of reaching underserved communities.

**MediShare** addresses these challenges through a unified decentralized platform:
1. **Immutable Pharmaceutical Verification**: Uses Ethereum/Hardhat Solidity smart contracts to register, authenticate, and timestamp medicine batches using cryptographic Keccak256 hashes and ERC-721 tokenization.
2. **Anti-Counterfeit QR Serialization**: Generates dynamic cryptographic QR packaging labels that enable instant point-of-care verification via mobile camera or web scanner.
3. **Automated Expiry Enforcement**: Smart contract business logic prevents the sale, verification, or dispensing of expired medicine batches.
4. **Multimodal Diagnostic Lab Report Analyzer**: Integrates Google Gemini AI to parse complex medical PDF/image reports into patient-friendly summaries and alerts.
5. **Community Medicine Redistribution & Marketplace**: Provides a transparent surplus medicine donation pipeline and verified medicine store.

---

## 🏗️ System Architecture

```
                                  ┌─────────────────────────────────────────────────────────┐
                                  │             MediShare Unified Web Application           │
                                  │                  (React 19 + TypeScript + Vite)         │
                                  │                      http://localhost:5173              │
                                  └───────────────┬─────────────────────────┬───────────────┘
                                                  │                         │
                                   Axios REST API │                         │ Web3 / Ethers.js
                                                  ▼                         ▼
                      ┌───────────────────────────────────────┐   ┌───────────────────────────────────┐
                      │       MediShare Express Backend       │   │       Hardhat Ethereum Node       │
                      │         (Port 5000 / Node.js)         │   │       (Port 8545 / Chain: 31337)  │
                      ├───────────────────────────────────────┤   ├───────────────────────────────────┤
                      │ • Auth & User Management              │   │ • MediShare.sol Smart Contract    │
                      │ • MongoDB Mongoose Schemas            │   │ • Keccak256 Batch Hashing         │
                      │ • Google Gemini AI Report Parser      │   │ • ERC-721 Batch Tokenization      │
                      │ • Medicine Donation Routing           │   │ • Automated Expiry Logic          │
                      │ • E-Commerce Store APIs               │   │ • Immutable Verification Ledger   │
                      └───────────────────────────────────────┘   └───────────────────────────────────┘
```

---

## 🔐 Smart Contract Architecture (`contracts/MediShare.sol`)

The `Medishare` smart contract extends OpenZeppelin's `ERC721Enumerable` and `Ownable` contracts:

* **Batch Registration (`addMedicine`)**: Registers a new medicine batch with batch ID, drug name, manufacturer address, and expiration timestamp.
* **Batch Verification (`verifyMedicine`)**: Verifies batch authenticity and enforces automatic on-chain expiry checking.
* **ERC-721 Authentication Minting (`authenticateBatch`)**: Mints a unique non-fungible digital certificate (NFT) corresponding to an authenticated medicine batch.
* **Auto-Expiry Check (`_autoExpireCheck`)**: Internal contract modifier that invalidates any batch whose `expiryDate <= block.timestamp`.

---

## 🚀 Key Modules & Capabilities

| Module | Technology | Description |
| :--- | :--- | :--- |
| **Healthcare Hub** | React 19, Framer Motion | Centralized telemetry dashboard showing verified batches, donations, and live inventory. |
| **QR Serialization** | `qrcode.react`, HTML5 Canvas | Generates printable cryptographic QR labels for medicine packaging. |
| **Batch Verification** | Ethers.js, Solidity | Point-of-care verification scanner verifying blockchain timestamps and active validity. |
| **AI Medical Reports** | Google Gemini API, Multer | Automated diagnostic report parsing of CBC, oncology, and prescription PDFs. |
| **Medicine Donations** | Express, MongoDB | Surplus medicine donation intake, review status, and NGO routing. |
| **Medicine Store** | MongoDB, TailwindCSS | Verified medicine catalog with batch tracking and direct purchasing. |
| **Admin Console** | React, Session Auth | Superuser management console for medicine approvals and node telemetry. |

---

## ⚡ Quick Start (Single Command)

To launch all MediShare services (Frontend, Hardhat Blockchain Node, Contract Deployment & Express Backend) automatically in dedicated terminal windows:

```cmd
.\start_all.bat
```

### Active Service Endpoints:
1. **Frontend UI**: `http://localhost:5173`
2. **Hardhat Blockchain Node**: `http://127.0.0.1:8545`
3. **MediShare API Backend**: `http://localhost:5000`

---

## 🛠️ Step-by-Step Manual Setup

### Prerequisites
* **Node.js**: v18+ & `npm`
* **MongoDB**: Local or Atlas connection URI

---

### Step 1: Backend & Blockchain Setup

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   npm install
   ```

2. Configure environment variables in `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/medishare
   JWT_SECRET=medishare_secret_jwt_key_2026
   API_URL=http://127.0.0.1:8545
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Terminal A (Start Hardhat Local Node):**
   ```bash
   npx hardhat node
   ```

4. **Terminal B (Compile & Deploy Contracts, Start Backend):**
   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network localhost
   npm run start
   ```

---

### Step 2: Frontend Setup

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

---

## 🧪 Testing & Build Validation

### Compile Solidity Smart Contracts
```bash
cd backend
npx hardhat compile
```

### Validate Production Frontend Build
```bash
cd frontend
npm run build
```

---

## 📂 Project Structure

```
MediShare/
├── frontend/                   # React 19 + TypeScript + Vite + Tailwind frontend
│   ├── src/pages/
│   │   ├── Landing.tsx         # MediShare animated hero & feature showcase
│   │   ├── MediShare.tsx       # Core MediShare hub (QR gen, Verify, AI Reports, Donations, Store)
│   │   └── Admin.tsx           # Administrative management & blockchain telemetry
│   ├── src/components/layout/  # Glassmorphic Navigation & Footer components
│   ├── src/api/medishare.ts    # Axios client for Web3 and backend endpoints
│   └── package.json
├── backend/                    # Express API, Solidity Smart Contracts & Hardhat Environment
│   ├── contracts/MediShare.sol # Solidity 0.8.20 ERC-721 smart contract
│   ├── scripts/deploy.js       # Hardhat automated deployment script
│   ├── hardhat.config.js       # Hardhat EVM network configuration
│   ├── routes/                 # Express REST routes (blockchain, user, medicine)
│   ├── models/                 # MongoDB Mongoose data schemas
│   ├── server.js & app.js      # Express application setup
│   └── package.json
├── start_all.bat               # Windows one-click 3-terminal launcher script
├── README.md                   # PBL project documentation
└── .gitignore
```

---

## 📄 License & Academic Submission
Developed for Academic Project-Based Learning (PBL) in Blockchain & Healthcare Technology.
