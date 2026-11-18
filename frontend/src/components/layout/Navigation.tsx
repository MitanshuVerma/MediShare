import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  QrCode,
  FileCheck,
  Award,
  HeartHandshake,
  ShoppingBag,
  Sliders,
  Menu,
  X,
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Overview', path: '/medishare', icon: ShieldCheck },
    { name: 'Register & QR', path: '/medishare/generate', icon: QrCode },
    { name: 'Verify Batch', path: '/medishare/verify', icon: FileCheck },
    { name: 'NFT Ledger', path: '/medishare/nfts', icon: Award },
    { name: 'Donations', path: '/medishare/donations', icon: HeartHandshake },
    { name: 'Store', path: '/medishare/store', icon: ShoppingBag },
    { name: 'Admin', path: '/admin', icon: Sliders },
  ];

  const isRouteActive = (path: string) => {
    if (path === '/medishare') {
      return location.pathname === '/medishare' || location.pathname === '/medishare/';
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-14 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 text-slate-900 font-semibold">
            <div className="w-8 h-8 rounded-md bg-teal-700 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold tracking-tight">MediShare</span>
              <span className="hidden sm:inline text-xs font-mono text-slate-500">
                Supply Chain & ERC-721
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isRouteActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    active
                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isRouteActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium ${
                    active
                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
