import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, QrCode, FileText, ShoppingBag, Sliders } from 'lucide-react';


const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-zinc-950/90 backdrop-blur-xl py-12 text-sm text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-fuchsia-500 to-pink-500 p-[1px] shadow-[0_0_15px_rgba(255,159,252,0.3)]">
              <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-fuchsia-400" />
              </div>
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">
              MediShare
            </span>
          </div>
          <p className="mb-3 text-xs text-zinc-400 leading-relaxed">
            Decentralized Healthcare & Medicine Supply Chain Verification Platform with Gemini AI Intelligence.
          </p>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-fuchsia-400 bg-fuchsia-950/40 border border-fuchsia-500/20 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
            <span>Web3 Blockchain • Smart Contracts</span>
          </div>
        </div>

        {/* Modules Column */}
        <div className="flex flex-col gap-2.5">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider text-zinc-300 mb-1">Platform Modules</h4>
          <Link to="/medishare" className="flex items-center gap-2 hover:text-white transition-colors text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Healthcare Hub Overview</span>
          </Link>
          <Link to="/medishare/generate" className="flex items-center gap-2 hover:text-white transition-colors text-xs">
            <QrCode className="w-3.5 h-3.5 text-pink-400" />
            <span>QR Batch Serialization</span>
          </Link>
          <Link to="/medishare/verify" className="flex items-center gap-2 hover:text-white transition-colors text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Blockchain Batch Verification</span>
          </Link>
          <Link to="/medishare/reports" className="flex items-center gap-2 hover:text-white transition-colors text-xs">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Gemini AI Diagnostic Reports</span>
          </Link>
          <Link to="/medishare/donations" className="flex items-center gap-2 hover:text-white transition-colors text-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-purple-400" />
            <span>Medicine Donation Portal</span>
          </Link>
          <Link to="/medishare/store" className="flex items-center gap-2 hover:text-white transition-colors text-xs">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Medicine Marketplace</span>
          </Link>
          <Link to="/admin" className="flex items-center gap-2 hover:text-white transition-colors text-xs">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Admin & Management Console</span>
          </Link>
        </div>

        {/* Resources Column */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider text-zinc-300 mb-1">Architecture</h4>
          <span className="text-xs text-zinc-400">Solidity 0.8.20 Smart Contracts</span>
          <span className="text-xs text-zinc-400">ERC721Enumerable Batch NFTs</span>
          <span className="text-xs text-zinc-400">Hardhat Local Ethereum Network</span>
          <span className="text-xs text-zinc-400">Ethers.js v6 Web3 Integration</span>
          <span className="text-xs text-zinc-400">Google Gemini AI Medical NLP</span>
          <span className="text-xs text-zinc-400">Express.js & MongoDB Multi-tier</span>
        </div>

        {/* Legal / PBL Submission */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider text-zinc-300 mb-1">PBL Project</h4>
          <p className="text-xs text-zinc-500 leading-relaxed">
            MediShare is engineered as an end-to-end Project-Based Learning (PBL) solution to combat counterfeit pharmaceuticals and ensure immutable supply-chain transparency through blockchain consensus and smart contracts.
          </p>
          <span className="text-[11px] text-zinc-600 mt-2 font-mono">
            &copy; 2026 MediShare. Decentralized Healthcare Ecosystem.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

