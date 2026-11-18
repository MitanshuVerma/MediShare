import { Link } from 'react-router-dom';
import { ShieldCheck, QrCode, Award, HeartHandshake, ShoppingBag, ArrowRight } from 'lucide-react';

const Landing = () => {
  const lifecycleSteps = [
    {
      step: '1. Register Batch',
      fn: 'addMedicine()',
      desc: 'Hashes batchNumber via keccak256 and stores drug name, brand, expiry timestamp, and manufacturer address on-chain.',
      to: '/medishare/generate',
    },
    {
      step: '2. Verify Batch',
      fn: 'verifyMedicine()',
      desc: 'Contract owner runs _autoExpireCheck() and sets on-chain verification status to true before minting.',
      to: '/medishare/verify',
    },
    {
      step: '3. Mint ERC-721 NFT',
      fn: 'authenticateBatch()',
      desc: 'Mints an ERC721Enumerable MediAuthToken (MAT) to the manufacturer address and binds tokenId to batchId.',
      to: '/medishare/nfts',
    },
    {
      step: '4. Point-of-Care Check',
      fn: 'verifyBatch()',
      desc: 'Scans packaging QR code or queries batchNumber to inspect on-chain validity, expiry, and NFT status.',
      to: '/medishare/verify',
    },
  ];

  const modules = [
    {
      title: 'Batch Registration & QR Generator',
      desc: 'Register new medicine batches on MediShare.sol + MongoDB and export printable packaging QR codes.',
      to: '/medishare/generate',
      icon: QrCode,
    },
    {
      title: 'Batch Verification & On-Chain Actions',
      desc: 'Verify batches via camera QR scan, uploaded QR image, or batch ID. Toggle verifyMedicine and mint NFTs.',
      to: '/medishare/verify',
      icon: ShieldCheck,
    },
    {
      title: 'ERC-721 NFT Ledger',
      desc: 'Inspect minted MediAuthToken (MAT) token IDs per manufacturer wallet and check token validity on-chain.',
      to: '/medishare/nfts',
      icon: Award,
    },
    {
      title: 'Surplus Medicine Donations',
      desc: 'Donate verified unexpired medicines to NGOs and review pending/approved donation records.',
      to: '/medishare/donations',
      icon: HeartHandshake,
    },
    {
      title: 'Medicine Store Inventory',
      desc: 'Browse registered medicine batches, unit prices, and available stock stored in MongoDB.',
      to: '/medishare/store',
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header Summary */}
      <section className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-4">
        <div className="inline-block px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
          Solidity 0.8.20 · ERC721Enumerable · Hardhat EVM (31337)
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          MediShare: Blockchain Pharmaceutical Supply Chain &amp; Verification
        </h1>
        <p className="text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          A decentralized application for registering pharmaceutical batches on an Ethereum smart contract,
          generating QR packaging tags, minting ERC-721 authenticity tokens, enforcing automated expiry checks,
          and managing surplus medicine donations.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            to="/medishare/generate"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium"
          >
            Register Medicine Batch
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/medishare/verify"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-medium"
          >
            Verify Batch / Scan QR
          </Link>
          <Link
            to="/medishare/nfts"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-medium"
          >
            Inspect ERC-721 NFTs
          </Link>
        </div>
      </section>

      {/* Smart Contract Lifecycle */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Smart Contract Lifecycle (MediShare.sol)</h2>
          <p className="text-xs text-slate-500">
            End-to-end state transitions stored on the Hardhat local blockchain node.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lifecycleSteps.map((item) => (
            <Link
              key={item.step}
              to={item.to}
              className="bg-white border border-slate-200 hover:border-teal-400 rounded-lg p-4 space-y-2 transition-colors"
            >
              <div className="text-xs font-semibold text-teal-800">{item.step}</div>
              <div className="font-mono text-xs bg-slate-100 border border-slate-200 rounded px-2 py-1 text-slate-800 inline-block">
                {item.fn}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Functional Modules */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Application Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.title}
                to={mod.to}
                className="bg-white border border-slate-200 hover:border-teal-400 rounded-lg p-5 flex flex-col justify-between gap-3 transition-colors"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-md bg-slate-100 border border-slate-200 text-teal-700 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm">{mod.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{mod.desc}</p>
                </div>
                <span className="text-xs font-medium text-teal-700 inline-flex items-center gap-1">
                  Open module <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Technical Architecture Table */}
      <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50">
          <h2 className="text-sm font-bold text-slate-900">System Endpoints &amp; Ports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 text-slate-500 uppercase bg-slate-50/50">
              <tr>
                <th className="px-5 py-2.5 font-semibold">Component</th>
                <th className="px-5 py-2.5 font-semibold">Endpoint / Address</th>
                <th className="px-5 py-2.5 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="px-5 py-2.5 font-medium">Hardhat Local Node</td>
                <td className="px-5 py-2.5 font-mono">http://127.0.0.1:8545</td>
                <td className="px-5 py-2.5">Executes MediShare.sol smart contract transactions &amp; state queries</td>
              </tr>
              <tr>
                <td className="px-5 py-2.5 font-medium">Express REST API</td>
                <td className="px-5 py-2.5 font-mono">http://localhost:5000</td>
                <td className="px-5 py-2.5">Ethers.js v6 contract bridge (/chain) &amp; MongoDB persistence (/ecommerce, /users)</td>
              </tr>
              <tr>
                <td className="px-5 py-2.5 font-medium">React Web Client</td>
                <td className="px-5 py-2.5 font-mono">http://localhost:5173</td>
                <td className="px-5 py-2.5">QR serialization, scanner verification, ERC-721 inspection, donations &amp; admin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Landing;
