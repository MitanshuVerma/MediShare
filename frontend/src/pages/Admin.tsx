import { useState, useEffect, type ReactNode, type FormEvent } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Activity,
  Database,
  HeartHandshake,
  Box,
  Loader2,
  Lock,
  LogOut,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { medishareService } from '../api/medishare';

const AdminSidebarLink = ({
  to,
  icon: Icon,
  children,
}: {
  to: string;
  icon: typeof Activity;
  children: ReactNode;
}) => {
  const location = useLocation();
  const isActive =
    to === '/admin'
      ? location.pathname === '/admin' || location.pathname === '/admin/'
      : location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
        isActive
          ? 'bg-teal-50 text-teal-800 font-medium border border-teal-200'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
      }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{children}</span>
    </Link>
  );
};

const AdminLogin = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const validAdmin =
      (adminId.trim().toLowerCase() === 'admin' ||
        adminId.trim().toLowerCase() === 'medrad_admin') &&
      (password === 'admin' ||
        password === 'admin123' ||
        password === 'medrad2026' ||
        password === 'password');

    if (validAdmin) {
      sessionStorage.setItem('medrad_admin_auth', 'true');
      sessionStorage.setItem('medrad_admin_user', adminId.trim());
      onLoginSuccess();
    } else {
      setError('Invalid Admin ID or Password.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-5">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
          <Lock className="w-5 h-5 text-teal-700" />
          <span>Admin Console Login</span>
        </div>
        <p className="text-xs text-slate-500">
          Manage medicine inventory, donation approvals, and contract calls.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Admin ID
          </label>
          <input
            type="text"
            required
            placeholder="admin"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="admin123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-slate-300 rounded-md text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute inset-y-0 right-0 px-3 text-slate-500 hover:text-slate-800"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-md text-sm font-medium"
        >
          Sign In
        </button>
      </form>

      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>
          Default: <code className="font-mono bg-slate-100 px-1 rounded">admin</code> /{' '}
          <code className="font-mono bg-slate-100 px-1 rounded">admin123</code>
        </span>
        <button
          type="button"
          onClick={() => {
            setAdminId('admin');
            setPassword('admin123');
            setError(null);
          }}
          className="text-teal-700 hover:underline font-medium"
        >
          Fill Demo
        </button>
      </div>
    </div>
  );
};

const AdminOverview = () => {
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [medCount, setMedCount] = useState<number | null>(null);
  const [donCount, setDonCount] = useState<number | null>(null);

  useEffect(() => {
    medishareService
      .checkHealth()
      .then(() => setBackendOnline(true))
      .catch(() => setBackendOnline(false));

    medishareService
      .getMedicines()
      .then((r) => setMedCount(Array.isArray(r.data) ? r.data.length : 0))
      .catch(() => setMedCount(null));

    medishareService
      .getAllDonations()
      .then((r) => setDonCount(Array.isArray(r.data) ? r.data.length : 0))
      .catch(() => setDonCount(null));
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Admin Overview</h1>
        <p className="text-sm text-slate-500 mt-0.5">Live service health and repository counts.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-xs font-semibold text-slate-500 uppercase">Express API (:5000)</div>
          <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
            {backendOnline === true ? 'ONLINE' : backendOnline === false ? 'OFFLINE' : 'CHECKING'}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-xs font-semibold text-slate-500 uppercase">Medicines in DB</div>
          <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
            {medCount === null ? 'N/A (DB Offline)' : medCount}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-xs font-semibold text-slate-500 uppercase">Donation Records</div>
          <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
            {donCount === null ? 'N/A (DB Offline)' : donCount}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-2 text-xs text-slate-600">
        <div className="font-bold text-slate-900 text-sm">Endpoints Wired</div>
        <div className="font-mono">POST /chain/api/medicines/add — Register batch on MediShare.sol</div>
        <div className="font-mono">PATCH /chain/api/medicines/verify — Toggle on-chain verifyMedicine</div>
        <div className="font-mono">POST /chain/api/nfts/mint — Mint ERC-721 MAT token via authenticateBatch</div>
        <div className="font-mono">GET /chain/api/verify/:batchNumber — Read on-chain verifyBatch result</div>
      </div>
    </div>
  );
};

const AdminDonations = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await medishareService.getAllDonations();
      if (Array.isArray(res.data)) setDonations(res.data);
    } catch {
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    setUpdatingId(id);
    try {
      await medishareService.updateDonationStatus(id, status, `Updated by admin to ${status}`);
      fetchDonations();
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4">
        Donation Management
      </h1>
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-sm text-slate-500 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading donations...
          </div>
        ) : donations.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">No donations submitted yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Medicine</th>
                  <th className="px-4 py-3">Batch</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {donations.map((row: any) => (
                  <tr key={row._id}>
                    <td className="px-4 py-3 text-slate-700">
                      {row.user?.name || row.user?.email || 'User'}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {row.medicine} ({row.brand || 'Generic'})
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-700">{row.batchNumber}</td>
                    <td className="px-4 py-3">{row.quantity}</td>
                    <td className="px-4 py-3 font-mono uppercase">{row.status || 'pending'}</td>
                    <td className="px-4 py-3">
                      {row.status !== 'approved' && row.status !== 'rejected' ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={updatingId === row._id}
                            onClick={() => handleStatusUpdate(row._id, 'approved')}
                            className="px-2.5 py-1 bg-emerald-700 text-white rounded text-xs"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            disabled={updatingId === row._id}
                            onClick={() => handleStatusUpdate(row._id, 'rejected')}
                            className="px-2.5 py-1 bg-red-700 text-white rounded text-xs"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminMedicines = () => {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', price: '', quantity: '', expirationDate: '' });
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const fetchMeds = async () => {
    setLoading(true);
    try {
      const res = await medishareService.getMedicines();
      if (Array.isArray(res.data)) setMedicines(res.data);
    } catch {
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeds();
  }, []);

  const handleAddMedicine = async (e: FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setMsg(null);
    try {
      await medishareService.addMedicine({
        name: form.name,
        price: Number(form.price),
        quantity: Number(form.quantity),
        expirationDate: form.expirationDate,
      });
      setMsg('Medicine added.');
      setForm({ name: '', price: '', quantity: '', expirationDate: '' });
      fetchMeds();
    } catch (err: any) {
      setMsg(err.response?.data?.error || 'Failed to add medicine.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4">
        Medicine Inventory
      </h1>

      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Add Medicine to Store</h2>
        {msg && <div className="p-2.5 bg-slate-100 border border-slate-200 rounded text-xs">{msg}</div>}
        <form onSubmit={handleAddMedicine} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            required
            placeholder="Medicine Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm"
          />
          <input
            type="number"
            required
            placeholder="Price ($)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm"
          />
          <input
            type="number"
            required
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm"
          />
          <input
            type="date"
            required
            value={form.expirationDate}
            onChange={(e) => setForm({ ...form, expirationDate: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm"
          />
          <button
            type="submit"
            disabled={adding}
            className="md:col-span-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-md text-sm font-medium"
          >
            {adding ? 'Adding...' : 'Add Medicine'}
          </button>
        </form>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <h2 className="text-sm font-bold text-slate-900 mb-3">Active Inventory ({medicines.length})</h2>
        {loading ? (
          <div className="text-sm text-slate-500">Loading...</div>
        ) : medicines.length === 0 ? (
          <div className="text-sm text-slate-500">No medicines found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {medicines.map((m: any) => (
              <div key={m._id} className="p-3 bg-slate-50 border border-slate-200 rounded-md text-xs">
                <div className="font-bold text-slate-900 text-sm">{m.name}</div>
                <div className="text-slate-600 mt-1">
                  Price: ${m.price} · Stock: {m.quantity}
                </div>
                {m.batchNumber && <div className="font-mono text-slate-500 mt-1">{m.batchNumber}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const AdminBlockchain = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runAction = async (fn: () => Promise<any>) => {
    if (!batchNumber.trim()) return;
    setLoading(true);
    setOutput(null);
    try {
      const res = await fn();
      setOutput(JSON.stringify(res.data, null, 2));
    } catch (err: any) {
      setOutput(JSON.stringify(err.response?.data || { error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4">
        Blockchain Contract Console
      </h1>

      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
            Target Batch Number
          </label>
          <input
            type="text"
            placeholder="e.g. BATCH-MS-12345"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm font-mono"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => runAction(() => medishareService.verifyBatch(batchNumber.trim()))}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-md text-xs font-medium"
          >
            verifyBatch()
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => runAction(() => medishareService.verifyMedicineBatch(batchNumber.trim(), true))}
            className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-md text-xs font-medium"
          >
            verifyMedicine(true)
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => runAction(() => medishareService.mintNFT(batchNumber.trim()))}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-medium"
          >
            authenticateBatch() / Mint NFT
          </button>
        </div>

        {output && (
          <pre className="p-4 rounded bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto">
            {output}
          </pre>
        )}
      </div>
    </div>
  );
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('medrad_admin_auth') === 'true';
  });

  const handleLogout = () => {
    sessionStorage.removeItem('medrad_admin_auth');
    sessionStorage.removeItem('medrad_admin_user');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-56 flex-shrink-0 space-y-1">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Admin Console
        </div>
        <AdminSidebarLink to="/admin" icon={Activity}>
          Overview
        </AdminSidebarLink>
        <AdminSidebarLink to="/admin/donations" icon={HeartHandshake}>
          Donations
        </AdminSidebarLink>
        <AdminSidebarLink to="/admin/medicines" icon={Box}>
          Medicines
        </AdminSidebarLink>
        <AdminSidebarLink to="/admin/blockchain" icon={Database}>
          Blockchain
        </AdminSidebarLink>
        <div className="pt-4 mt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/donations" element={<AdminDonations />} />
          <Route path="/medicines" element={<AdminMedicines />} />
          <Route path="/blockchain" element={<AdminBlockchain />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
