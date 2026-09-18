import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  QrCode, 
  FileText, 
  HeartHandshake, 
  Cpu, 
  Lock, 
  Database, 
  Pill
} from 'lucide-react';

// @ts-ignore
import ColorBends from '../components/ui/ColorBends';

const Landing: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">
        {/* Background ColorBends */}
        <div className="absolute inset-0 z-0 opacity-80">
           <ColorBends
             colors={["#a21caf", "#ec4899", "#06b6d4"]}
             rotation={90}
             speed={0.2}
             scale={1}
             frequency={1}
             warpStrength={1}
             mouseInfluence={1}
             noise={0.15}
             parallax={0.5}
             iterations={1}
             intensity={1.5}
             bandWidth={6}
             transparent
           />
        </div>

        {/* Hero Content */}
        <div className="z-10 text-center max-w-4xl px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse-slow"></span>
            <span className="text-sm font-medium tracking-wide text-white/80 font-mono">MEDISHARE • WEB3 HEALTHCARE & VERIFICATION</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl font-bold font-display mb-6 tracking-tighter"
          >
            Trust & Transparency for <br />
            <span className="heading-gradient">Medicine Supply</span> Chains.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/60 mb-10 max-w-2xl font-light"
          >
            Decentralized medicine batch verification via Solidity smart contracts, AI-powered diagnostic lab report analysis, and community surplus medicine redistribution.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/medishare" className="btn-primary flex items-center justify-center gap-2 group">
              Launch Healthcare Hub
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/medishare/verify" className="btn-secondary flex items-center justify-center gap-2 group">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verify Medicine Batch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS / PIPELINE */}
      <section className="w-full max-w-7xl px-6 py-24 flex flex-col items-center border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">A Seamless Flow of Verification</h2>
          <p className="text-white/50">From batch manufacturing to patient validation & redistribution.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
          {[
            { title: "Batch Registration", icon: <Pill className="w-6 h-6 text-fuchsia-400" /> },
            { title: "Smart Contract", icon: <Cpu className="w-6 h-6 text-pink-400" /> },
            { title: "QR Serialization", icon: <QrCode className="w-6 h-6 text-cyan-400" /> },
            { title: "Point-of-Care Scan", icon: <ShieldCheck className="w-6 h-6 text-emerald-400" /> },
            { title: "AI & Redistribution", icon: <HeartHandshake className="w-6 h-6 text-purple-400" /> }
          ].map((step, i) => (
            <React.Fragment key={i}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 flex flex-col items-center gap-3 w-48 text-center"
              >
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  {step.icon}
                </div>
                <span className="font-medium text-sm text-zinc-200">{step.title}</span>
              </motion.div>
              {i < 4 && (
                <div className="hidden md:block w-8 h-[1px] bg-gradient-to-r from-white/20 to-transparent"></div>
              )}
              {i < 4 && (
                <div className="md:hidden h-8 w-[1px] bg-gradient-to-b from-white/20 to-transparent my-2"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* PRODUCT FEATURES GRID */}
      <section className="w-full max-w-7xl px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* BLOCKCHAIN BATCH VERIFICATION CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-fuchsia-500/10 blur-[100px] rounded-full group-hover:bg-fuchsia-500/20 transition-colors duration-500 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-fuchsia-500/20 text-fuchsia-400 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(217,70,239,0.2)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-display font-bold text-white">Blockchain Verification</h2>
              <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20">
                Ethereum • Solidity
              </span>
            </div>
            <h3 className="text-lg text-white/80 mb-4 font-light">Immutable Batch Ledger & Tokenization</h3>
            <p className="text-white/60 mb-6 leading-relaxed text-sm">
              Each medicine batch is cryptographically registered into Solidity smart contracts on the Ethereum blockchain. Features keccak256 batch hashing, automated expiry invalidation, and ERC-721 authentication tokens.
            </p>
            
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.08]">
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                Solidity 0.8.20
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                ERC721Enumerable NFT
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                Hardhat Local Node
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                Auto-Expiry Protection
              </span>
            </div>
          </div>
        </motion.div>

        {/* GEMINI AI MEDICAL REPORTS CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 relative overflow-hidden group"
        >
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 blur-[100px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-500 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-display font-bold text-white">Gemini AI Diagnostics</h2>
              <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                GenAI Report NLP
              </span>
            </div>
            <h3 className="text-lg text-white/80 mb-4 font-light">Automated Patient Lab Report Parser</h3>
            <p className="text-white/60 mb-6 leading-relaxed text-sm">
              Upload complex medical PDF lab reports, CBC tests, or prescriptions. Google Gemini AI parses clinical jargon into actionable insights, vital parameter summaries, and dietary/precautionary guidelines.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.08]">
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                Multimodal PDF Ingestion
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                Key Biomarker Extraction
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                Actionable Patient Insights
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                Clinical Safety Warnings
              </span>
            </div>
          </div>
        </motion.div>

        {/* QR CODE SERIALIZATION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/10 blur-[100px] rounded-full group-hover:bg-pink-500/20 transition-colors duration-500 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
              <QrCode className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-display font-bold text-white">QR Serialization</h2>
              <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
                Anti-Counterfeiting
              </span>
            </div>
            <h3 className="text-lg text-white/80 mb-4 font-light">Cryptographic Packaging Verification</h3>
            <p className="text-white/60 mb-6 leading-relaxed text-sm">
              Generate tamper-proof QR labels for pharmaceutical packaging that encode real-time verification URLs. Integrated camera scanner allows instant smartphone verification for consumers.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.08]">
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                Dynamic QR Label Export
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                Live Web Camera Scanner
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                Batch Integrity Validation
              </span>
            </div>
          </div>
        </motion.div>

        {/* DONATION NETWORK & STORE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 relative overflow-hidden group"
        >
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-[100px] rounded-full group-hover:bg-purple-500/20 transition-colors duration-500 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-display font-bold text-white">Donation & Store</h2>
              <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Community Healthcare
              </span>
            </div>
            <h3 className="text-lg text-white/80 mb-4 font-light">Surplus Medicine Redistribution</h3>
            <p className="text-white/60 mb-6 leading-relaxed text-sm">
              Connect surplus medicine donors with healthcare facilities and NGOs. Verified medicines are tracked from contribution through administrative approval to the medicine catalog.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.08]">
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                Medicine Donation Pipeline
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                Admin Quality Approval
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70">
                Verified Medicine Catalog
              </span>
            </div>
          </div>
        </motion.div>

      </section>

      {/* TECH STACK */}
      <section className="w-full max-w-7xl px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">Powered by Modern Web3 & AI Architecture</h2>
          <p className="text-zinc-400 text-sm">Engineered with enterprise-grade decentralized protocols and modern web frameworks.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-display text-white/80 mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-fuchsia-400" /> Blockchain & Smart Contracts
            </h3>
            <div className="flex flex-wrap gap-3">
              {['Solidity 0.8.20', 'Hardhat', 'Ethereum (EVM)', 'ERC-721 Enumerable', 'Ethers.js v6', 'OpenZeppelin Contracts'].map(tech => (
                <span key={tech} className="px-4 py-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-950/20 text-fuchsia-200 text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-display text-white/80 mb-6 flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" /> Web Application & AI Core
            </h3>
            <div className="flex flex-wrap gap-3">
              {['React 19', 'TypeScript', 'Vite 8', 'TailwindCSS 4', 'Google Gemini AI', 'Express.js', 'MongoDB Mongoose', 'Framer Motion'].map(tech => (
                <span key={tech} className="px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-cyan-200 text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / SECURITY */}
      <section className="w-full py-16 bg-white/5 border-t border-b border-white/10 text-center flex flex-col items-center">
        <Lock className="w-8 h-8 text-fuchsia-400/60 mb-4" />
        <h2 className="text-2xl font-display font-medium mb-2 text-white">Cryptographically Verified. Zero-Trust Healthcare.</h2>
        <p className="text-white/50 max-w-lg text-sm">
          All batch authenticity claims are cryptographically enforced on-chain. Counterfeit medicines are rejected through tamper-evident hash validation.
        </p>
      </section>

    </div>
  );
};

export default Landing;

