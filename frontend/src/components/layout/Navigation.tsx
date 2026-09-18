import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  QrCode,
  FileCheck,
  FileText,
  HeartHandshake,
  ShoppingBag,
  Sliders, 
  Menu, 
  X
} from 'lucide-react';


const Navigation: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { 
      name: 'Hub', 
      label: 'Platform Overview',
      path: '/medishare', 
      icon: ShieldCheck,
    },
    { 
      name: 'QR Gen', 
      label: 'QR Serialization',
      path: '/medishare/generate', 
      icon: QrCode,
    },
    { 
      name: 'Verify', 
      label: 'Blockchain Verification',
      path: '/medishare/verify', 
      icon: FileCheck,
    },
    { 
      name: 'AI Reports', 
      label: 'Gemini Diagnostic Lab',
      path: '/medishare/reports', 
      icon: FileText,
    },
    { 
      name: 'Donations', 
      label: 'Medicine Pool',
      path: '/medishare/donations', 
      icon: HeartHandshake,
    },
    { 
      name: 'Store', 
      label: 'Medicine Catalog',
      path: '/medishare/store', 
      icon: ShoppingBag,
    },
    { 
      name: 'Admin', 
      label: 'Control Console',
      path: '/admin', 
      icon: Sliders,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300 px-3 sm:px-6 pt-3 sm:pt-4">
      <motion.nav 
        layout
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className={`pointer-events-auto mx-auto rounded-full transition-all duration-300 ${
          scrolled
            ? 'max-w-3xl sm:max-w-4xl bg-zinc-950/85 backdrop-blur-2xl border border-white/[0.14] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.85),0_0_25px_rgba(255,159,252,0.18)]'
            : 'max-w-7xl bg-transparent border border-transparent shadow-none'
        }`}
      >
        <div 
          className={`transition-all duration-300 flex items-center justify-between ${
            scrolled 
              ? 'h-13 sm:h-14 px-4 sm:px-5' 
              : 'h-16 px-6 sm:px-8'
          }`}
        >
          
          {/* Brand Logo & Name */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 sm:gap-3 group transition-transform hover:scale-[1.02]"
          >
            {/* Glowing Shield/Pill Icon */}
            <motion.div 
              layout
              className={`rounded-xl bg-gradient-to-tr from-fuchsia-500 via-pink-500 to-cyan-400 p-[1px] shadow-[0_0_20px_rgba(255,159,252,0.4)] group-hover:shadow-[0_0_28px_rgba(255,159,252,0.65)] transition-all duration-300 flex items-center justify-center ${
                scrolled ? 'w-8 h-8' : 'w-9 h-9 sm:w-10 sm:h-10'
              }`}
            >
              <div className="w-full h-full bg-zinc-950/90 rounded-[11px] flex items-center justify-center backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ShieldCheck className={`text-fuchsia-400 group-hover:text-fuchsia-300 transition-all ${scrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
              </div>
            </motion.div>

            {/* Brand Typography */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className={`font-display font-black tracking-tight bg-gradient-to-r from-white via-zinc-100 to-fuchsia-200 bg-clip-text text-transparent leading-none transition-all ${
                  scrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                }`}>
                  MediShare
                </span>
                
                {/* Web3 badge only on wide un-scrolled mode */}
                <AnimatePresence>
                  {!scrolled && (
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="hidden xs:inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/25"
                    >
                      Web3 + AI
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Subtitle collapses when scrolled into bubble mode */}
              <AnimatePresence>
                {!scrolled && (
                  <motion.span 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase mt-0.5 hidden sm:block leading-none overflow-hidden"
                  >
                    Decentralized Healthcare
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center p-1 rounded-full bg-zinc-950/60 border border-white/[0.12] backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = (item.path === '/medishare' && (location.pathname === '/medishare' || location.pathname === '/medishare/')) ||
                               (item.path !== '/medishare' && location.pathname === item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 group ${
                    scrolled ? 'px-3 py-1.5 text-[11px]' : 'px-3.5 sm:px-4 py-2 text-xs'
                  } ${
                    isActive
                      ? 'text-white bg-white/[0.14] border border-white/[0.2] shadow-[0_0_20px_rgba(217,70,239,0.25),inset_0_1px_1px_rgba(255,255,255,0.3)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className={`transition-transform duration-300 group-hover:scale-110 ${
                    scrolled ? 'w-3 h-3' : 'w-3.5 h-3.5'
                  } ${
                    isActive ? 'text-fuchsia-400' : 'text-zinc-400 group-hover:text-zinc-200'
                  }`} />
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_#e879f9] animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile/Tablet Menu Toggle Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden border-t border-white/[0.08] px-4 py-4 space-y-2 bg-zinc-950/95 rounded-b-2xl backdrop-blur-2xl mt-1"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = (item.path === '/medishare' && (location.pathname === '/medishare' || location.pathname === '/medishare/')) ||
                               (item.path !== '/medishare' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/[0.12] text-white border border-white/[0.15] shadow-[0_0_15px_rgba(217,70,239,0.2)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-fuchsia-400' : 'text-zinc-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono">{item.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </motion.nav>
    </header>
  );
};

export default Navigation;

