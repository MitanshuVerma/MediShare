import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="font-bold text-slate-900 text-sm mb-1">MediShare</div>
          <p className="text-slate-500 leading-relaxed">
            Pharmaceutical batch verification, ERC-721 authenticity certificates, and surplus medicine redistribution.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="font-semibold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
            Modules
          </div>
          <Link to="/medishare/generate" className="hover:text-teal-700">
            Register Batch &amp; QR Generator
          </Link>
          <Link to="/medishare/verify" className="hover:text-teal-700">
            Batch Verification &amp; NFT Mint
          </Link>
          <Link to="/medishare/nfts" className="hover:text-teal-700">
            ERC-721 NFT Ledger
          </Link>
          <Link to="/medishare/donations" className="hover:text-teal-700">
            Surplus Medicine Donations
          </Link>
          <Link to="/admin" className="hover:text-teal-700">
            Admin Console
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <div className="font-semibold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
            Blockchain Stack
          </div>
          <span className="font-mono text-slate-500">Contract: MediShare.sol (Solidity 0.8.20)</span>
          <span className="font-mono text-slate-500">Token Standard: ERC721Enumerable (MAT)</span>
          <span className="font-mono text-slate-500">Local EVM: Hardhat Node (Chain ID 31337)</span>
          <span className="font-mono text-slate-500">API: Express.js + Ethers.js v6 + MongoDB</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
