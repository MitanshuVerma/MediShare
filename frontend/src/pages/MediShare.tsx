import { useState, useEffect, type ReactNode, type FormEvent, type ChangeEvent } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  QrCode,
  ShieldCheck,
  HeartHandshake,
  ShoppingBag,
  Award,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Download,
  Printer,
  Camera,
  RefreshCw,
  Copy,
  Check,
  Upload,
  Plus,
  Minus,
  ExternalLink,
  Search,
} from 'lucide-react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { Html5Qrcode } from 'html5-qrcode';
import { medishareService } from '../api/medishare';

const SidebarLink = ({
  to,
  icon: Icon,
  children,
}: {
  to: string;
  icon: typeof LayoutDashboard;
  children: ReactNode;
}) => {
  const location = useLocation();
  const isActive =
    to === '/medishare'
      ? location.pathname === '/medishare' || location.pathname === '/medishare/'
      : location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${isActive
          ? 'bg-teal-50 text-teal-800 font-medium border border-teal-200'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
        }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{children}</span>
    </Link>
  );
};

// --- OVERVIEW ---
const Overview = () => {
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const [stats, setStats] = useState({
    verified: 0,
    donations: 0,
    medicines: 0,
  });

  useEffect(() => {
    medishareService
      .checkHealth()
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));

    const loadStats = async () => {
      try {
        const [medsRes, donRes] = await Promise.all([
          medishareService.getMedicines().catch(() => ({ data: [] })),
          medishareService.getAllDonations().catch(() => ({ data: [] })),
        ]);
        const medsList = Array.isArray(medsRes.data) ? medsRes.data : [];
        const donList = Array.isArray(donRes.data) ? donRes.data : [];
        setStats({
          verified: medsList.filter((m: any) => m.isVerified).length || medsList.length,
          donations: donList.length,
          medicines: medsList.length,
        });
      } catch {
        // Ignore stat load errors when DB is offline
      }
    };
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Supply Chain Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Register medicine batches, verify on-chain authenticity, mint ERC-721 certificates, and track donations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border ${apiOnline === true
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : apiOnline === false
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
          >
            API: {apiOnline === true ? 'ONLINE (:5000)' : apiOnline === false ? 'OFFLINE' : 'CHECKING'}
          </span>
          <Link
            to="/medishare/generate"
            className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-md text-xs"
          >
            + Register Batch
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="text-xs font-medium text-slate-500 uppercase">Registered Medicines</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{stats.medicines}</div>
          <div className="text-xs text-slate-500 mt-1">MongoDB medicine inventory</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="text-xs font-medium text-slate-500 uppercase">Verified Records</div>
          <div className="text-2xl font-bold text-teal-700 mt-1">{stats.verified}</div>
          <div className="text-xs text-slate-500 mt-1">Verified batches synced</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="text-xs font-medium text-slate-500 uppercase">Medicine Donations</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{stats.donations}</div>
          <div className="text-xs text-slate-500 mt-1">Active donation records</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Smart Contract Workflow (MediShare.sol)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <Link
            to="/medishare/generate"
            className="p-4 rounded-md border border-slate-200 hover:border-teal-400 space-y-1.5"
          >
            <div className="font-semibold text-slate-900">1. Add Medicine Batch &amp; QR</div>
            <p className="text-slate-600">
              Calls <code className="font-mono bg-slate-100 px-1 rounded">addMedicine()</code> on Hardhat EVM and generates a QR code.
            </p>
          </Link>
          <Link
            to="/medishare/verify"
            className="p-4 rounded-md border border-slate-200 hover:border-teal-400 space-y-1.5"
          >
            <div className="font-semibold text-slate-900">2. Verify &amp; Mint ERC-721 NFT</div>
            <p className="text-slate-600">
              Calls <code className="font-mono bg-slate-100 px-1 rounded">verifyBatch()</code>,{' '}
              <code className="font-mono bg-slate-100 px-1 rounded">verifyMedicine()</code>, and{' '}
              <code className="font-mono bg-slate-100 px-1 rounded">authenticateBatch()</code>.
            </p>
          </Link>
          <Link
            to="/medishare/nfts"
            className="p-4 rounded-md border border-slate-200 hover:border-teal-400 space-y-1.5"
          >
            <div className="font-semibold text-slate-900">3. Inspect ERC-721 Token Ledger</div>
            <p className="text-slate-600">
              Queries <code className="font-mono bg-slate-100 px-1 rounded">getManufacturerNFTs()</code> and{' '}
              <code className="font-mono bg-slate-100 px-1 rounded">isNFTValid()</code>.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- REGISTER BATCH & QR GENERATOR ---
const GenerateQR = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    batchNumber: '',
    name: '',
    brand: '',
    rawDate: '',
    dateFormat: 'YYYY-MM-DD',
    expiryDate: '',
    manufacturerDetails: '',
    manufacturer: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    price: '25',
    quantity: '100',
  });

  const [loading, setLoading] = useState(false);
  const [activeQrData, setActiveQrData] = useState<string | null>(null);
  const [contractRegistered, setContractRegistered] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrStyle, setQrStyle] = useState<'light' | 'dark'>('light');
  const [mode, setMode] = useState<'full' | 'quick'>('full');
  const [quickBatch, setQuickBatch] = useState('');

  const generateRandomBatch = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newBatch = `BATCH-MS-${randomNum}`;
    setForm((prev) => ({ ...prev, batchNumber: newBatch }));
    setQuickBatch(newBatch);
  };

  const applyFormattedDate = (isoDate: string, format: string) => {
    if (!isoDate) return;
    const [yyyy, mm, dd] = isoDate.split('-');
    let formatted = isoDate;
    if (format === 'DD/MM/YYYY') formatted = `${dd}/${mm}/${yyyy}`;
    else if (format === 'MM/DD/YYYY') formatted = `${mm}/${dd}/${yyyy}`;
    else if (format === 'MM/YYYY') formatted = `${mm}/${yyyy}`;

    setForm((prev) => ({
      ...prev,
      rawDate: isoDate,
      dateFormat: format,
      expiryDate: formatted,
    }));
  };

  const setPresetDate = (monthsToAdd: number) => {
    const d = new Date();
    d.setMonth(d.getMonth() + monthsToAdd);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    applyFormattedDate(`${yyyy}-${mm}-${dd}`, form.dateFormat);
  };

  useEffect(() => {
    if (!form.batchNumber) generateRandomBatch();
    if (!form.rawDate) setPresetDate(12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setContractRegistered(null);
    setLoading(true);

    try {
      if (mode === 'quick') {
        if (!quickBatch.trim()) {
          setError('Please enter a batch number.');
          setLoading(false);
          return;
        }
        setActiveQrData(quickBatch.trim());
        setSuccessMsg(`QR Code generated for batch: ${quickBatch.trim()}`);
        setLoading(false);
        return;
      }

      if (
        !form.batchNumber ||
        !form.name ||
        !form.brand ||
        !form.rawDate ||
        !form.manufacturerDetails ||
        !form.manufacturer
      ) {
        setError('All required fields must be filled.');
        setLoading(false);
        return;
      }

      const res = await medishareService.addMedicineBatch({
        batchNumber: form.batchNumber.trim(),
        name: form.name.trim(),
        brand: form.brand.trim(),
        expiryDate: form.rawDate,
        manufacturerDetails: form.manufacturerDetails.trim(),
        manufacturer: form.manufacturer.trim(),
        price: Number(form.price) || 20,
        quantity: Number(form.quantity) || 100,
      });

      const onChain = Boolean(res.data?.contractRegistered);
      setContractRegistered(onChain);
      setActiveQrData(form.batchNumber.trim());
      setSuccessMsg(
        onChain
          ? `Batch "${form.batchNumber}" registered on MediShare.sol smart contract${res.data?.mongoRecord ? ' and MongoDB' : ''}.`
          : `Batch "${form.batchNumber}" saved off-chain (smart contract call skipped or failed — ensure Hardhat node is running).`
      );
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to register medicine batch');
      setActiveQrData(form.batchNumber.trim());
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPNG = () => {
    const canvas = document.getElementById('medishare-qr-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `MediShare-QR-${activeQrData || form.batchNumber}.png`;
    a.click();
  };

  const handleCopyBatch = () => {
    const textToCopy = activeQrData || form.batchNumber;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Register Medicine Batch &amp; QR</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Registers batch metadata via <code className="font-mono text-xs">addMedicine()</code> on-chain and generates a printable QR code.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-md border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setMode('full')}
            className={`px-3 py-1.5 rounded font-medium ${mode === 'full' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-600'
              }`}
          >
            Register on Chain + DB
          </button>
          <button
            type="button"
            onClick={() => setMode('quick')}
            className={`px-3 py-1.5 rounded font-medium ${mode === 'quick' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-600'
              }`}
          >
            Quick QR Only
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>{successMsg}</span>
            {contractRegistered !== null && (
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-white border border-emerald-300">
                onChain: {String(contractRegistered)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() =>
              navigate(`/medishare/verify?batch=${encodeURIComponent(activeQrData || form.batchNumber)}`)
            }
            className="text-xs font-semibold underline text-emerald-800"
          >
            Verify &amp; Mint NFT →
          </button>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6">
          {mode === 'quick' ? (
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                  Batch Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. BATCH-MS-9012"
                    value={quickBatch}
                    onChange={(e) => setQuickBatch(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm font-mono text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                  <button
                    type="button"
                    onClick={generateRandomBatch}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-md text-xs font-medium flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Random
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-md text-sm flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" /> Generate QR Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                  Batch Number *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={form.batchNumber}
                    onChange={(e) => setForm({ ...form, batchNumber: e.target.value })}
                    className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm font-mono text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                  <button
                    type="button"
                    onClick={generateRandomBatch}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-md text-xs font-medium flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Generate ID
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amoxicillin 500mg"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cipla"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase">Expiry Date *</label>
                  <select
                    value={form.dateFormat}
                    onChange={(e) => applyFormattedDate(form.rawDate, e.target.value)}
                    className="bg-white border border-slate-300 rounded px-2 py-1 text-xs font-mono text-slate-700"
                  >
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="MM/YYYY">MM/YYYY</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <input
                    type="date"
                    required
                    value={form.rawDate}
                    onChange={(e) => applyFormattedDate(e.target.value, form.dateFormat)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900"
                  />
                  <div className="text-xs font-mono bg-white px-3 py-2 rounded-md border border-slate-200 flex justify-between">
                    <span className="text-slate-500">Label:</span>
                    <span className="font-semibold text-slate-900">{form.expiryDate || '-'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: '+6 Mo', months: 6 },
                    { label: '+1 Yr', months: 12 },
                    { label: '+2 Yr', months: 24 },
                    { label: '+3 Yr', months: 36 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setPresetDate(p.months)}
                      className="px-2.5 py-1 rounded text-xs bg-white border border-slate-300 hover:bg-slate-100 text-slate-700"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                  Facility / Manufacturer Details *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Plant-04, WHO-GMP Certified Facility"
                  value={form.manufacturerDetails}
                  onChange={(e) => setForm({ ...form, manufacturerDetails: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                  Manufacturer Ethereum Address (Hardhat Wallet) *
                </label>
                <input
                  type="text"
                  required
                  value={form.manufacturer}
                  onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-mono text-slate-800 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Price ($)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Quantity</label>
                  <input
                    type="number"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-medium rounded-md text-sm flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                Register Batch &amp; Generate QR
              </button>
            </form>
          )}
        </div>

        {/* Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold uppercase text-slate-500">Packaging Label Preview</span>
              <div className="flex border border-slate-200 rounded overflow-hidden text-xs">
                {(['light', 'dark'] as const).map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setQrStyle(style)}
                    className={`px-2.5 py-1 capitalize ${qrStyle === style ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'
                      }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div
              id="printable-medicine-label"
              className={`p-5 rounded-md border text-center ${qrStyle === 'dark'
                  ? 'bg-slate-900 text-white border-slate-800'
                  : 'bg-white text-slate-900 border-slate-300'
                }`}
            >
              <div className="flex justify-between items-center border-b border-slate-200/30 pb-2 mb-4 text-xs">
                <span className="font-bold">MEDISHARE</span>
                <span className="font-mono text-[11px]">ERC-721 BATCH TAG</span>
              </div>

              <div className="inline-block p-3 bg-white rounded border border-slate-200">
                <div style={{ display: 'none' }}>
                  <QRCodeCanvas
                    id="medishare-qr-canvas"
                    value={activeQrData || form.batchNumber || 'BATCH-SAMPLE'}
                    size={400}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <QRCodeSVG
                  value={activeQrData || form.batchNumber || 'BATCH-SAMPLE'}
                  size={170}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <div className="mt-4 text-left text-xs space-y-1">
                <div className="font-bold text-sm truncate">{form.name || 'Medicine Name'}</div>
                <div className="flex justify-between opacity-80">
                  <span>Brand: {form.brand || 'Manufacturer'}</span>
                  <span>Exp: {form.expiryDate || 'YYYY-MM-DD'}</span>
                </div>
                <div className="pt-2 border-t border-slate-200/30 font-mono flex justify-between">
                  <span>BATCH:</span>
                  <span className="font-bold">{activeQrData || form.batchNumber || 'BATCH-SAMPLE'}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleDownloadPNG}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-md text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download PNG
              </button>
              <button
                type="button"
                onClick={handleCopyBatch}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-md text-xs font-medium flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Batch ID'}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-md text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print Label
              </button>
              <button
                type="button"
                onClick={() =>
                  navigate(`/medishare/verify?batch=${encodeURIComponent(activeQrData || form.batchNumber)}`)
                }
                className="py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-md text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Verify Batch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VERIFY BATCH & ON-CHAIN CONTRACT ACTIONS ---
const Verify = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialBatch = queryParams.get('batch') || '';

  const [batch, setBatch] = useState(initialBatch);
  const [verifying, setVerifying] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [html5QrCodeScanner, setHtml5QrCodeScanner] = useState<Html5Qrcode | null>(null);

  const scannerRegionId = 'qr-reader-region';

  const runVerification = async (batchNum: string) => {
    if (!batchNum.trim()) return;
    setVerifying(true);
    setError(null);
    setActionMsg(null);
    try {
      const res = await medishareService.verifyBatch(batchNum.trim());
      setResult(res.data);
    } catch (err: any) {
      setResult(null);
      setError(err.response?.data?.error || 'Batch not found on blockchain or database.');
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    if (initialBatch) {
      setBatch(initialBatch);
      runVerification(initialBatch);
    }
  }, [initialBatch]);

  const handleToggleVerifyOnChain = async (status: boolean) => {
    if (!batch.trim()) return;
    setActionLoading('verify');
    setActionMsg(null);
    try {
      await medishareService.verifyMedicineBatch(batch.trim(), status);
      setActionMsg({
        type: 'ok',
        text: `Smart contract verifyMedicine("${batch.trim()}", ${status}) confirmed.`,
      });
      await runVerification(batch.trim());
    } catch (err: any) {
      setActionMsg({
        type: 'err',
        text: err.response?.data?.error || err.message || 'Contract verify failed.',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleMintNFT = async () => {
    if (!batch.trim()) return;
    setActionLoading('mint');
    setActionMsg(null);
    try {
      const res = await medishareService.mintNFT(batch.trim());
      setActionMsg({
        type: 'ok',
        text: `Minted ERC-721 Token ID #${res.data.tokenId} (Tx: ${res.data.transactionHash})`,
      });
      await runVerification(batch.trim());
    } catch (err: any) {
      setActionMsg({
        type: 'err',
        text: err.response?.data?.error || err.message || 'NFT minting failed (ensure batch is verified on-chain first).',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const toggleCameraScanner = async () => {
    if (scannerActive) {
      if (html5QrCodeScanner) {
        try {
          await html5QrCodeScanner.stop();
          html5QrCodeScanner.clear();
        } catch {
          // Ignore stop errors
        }
      }
      setScannerActive(false);
    } else {
      setScannerActive(true);
      setError(null);
      setTimeout(async () => {
        try {
          const qrScanner = new Html5Qrcode(scannerRegionId);
          setHtml5QrCodeScanner(qrScanner);
          await qrScanner.start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              setBatch(decodedText);
              qrScanner.stop().then(() => {
                qrScanner.clear();
                setScannerActive(false);
                runVerification(decodedText);
              });
            },
            () => { }
          );
        } catch {
          setError('Unable to access camera. Upload a QR image or enter the batch number manually.');
          setScannerActive(false);
        }
      }, 150);
    }
  };

  const handleQrFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const html5Qr = new Html5Qrcode('hidden-file-qr-reader');
        const decodedText = await html5Qr.scanFile(e.target.files[0], true);
        setBatch(decodedText);
        runVerification(decodedText);
      } catch {
        setError('Could not decode a valid QR code from the uploaded image.');
      }
    }
  };

  const details = result?.batchDetails;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Verify Batch &amp; Mint NFT</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Query <code className="font-mono text-xs">verifyBatch()</code> on MediShare.sol, approve batch verification, and mint ERC-721 certificates.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Enter Batch Number (e.g. BATCH-MS-12345)"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') runVerification(batch);
            }}
            className="flex-1 min-w-[220px] px-3 py-2 bg-white border border-slate-300 rounded-md text-sm font-mono text-slate-900 focus:outline-none focus:border-teal-600"
          />
          <button
            type="button"
            onClick={() => runVerification(batch)}
            disabled={verifying || !batch.trim()}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white rounded-md text-sm font-medium flex items-center gap-1.5"
          >
            {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Query Contract
          </button>
          <button
            type="button"
            onClick={toggleCameraScanner}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-md text-xs font-medium flex items-center gap-1.5"
          >
            <Camera className="w-4 h-4" /> {scannerActive ? 'Stop Camera' : 'Scan QR'}
          </button>
          <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-md text-xs font-medium cursor-pointer flex items-center gap-1.5">
            <Upload className="w-4 h-4" /> Upload QR
            <input type="file" accept="image/*" onChange={handleQrFileUpload} className="hidden" />
          </label>
        </div>

        <div id="hidden-file-qr-reader" style={{ display: 'none' }} />

        {scannerActive && (
          <div className="max-w-sm mx-auto border border-slate-300 rounded-md overflow-hidden bg-black">
            <div id={scannerRegionId} className="w-full" />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Sample IDs:</span>
          {['BATCH-VERIFY-001', 'BATCH-VERIFY-002', 'BATCH-LIVE-COMBIFLAM'].map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => {
                setBatch(sample);
                runVerification(sample);
              }}
              className="font-mono underline hover:text-slate-900"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {actionMsg && (
        <div
          className={`p-3.5 rounded-md border text-sm font-mono ${actionMsg.type === 'ok'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-red-50 border-red-200 text-red-800'
            }`}
        >
          {actionMsg.text}
        </div>
      )}

      {details && (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
            <div>
              <div className="text-xs font-mono text-slate-500">BATCH: {batch}</div>
              <h2 className="text-lg font-bold text-slate-900">
                {details.isValid ? 'Valid & Active Batch' : 'Invalid / Expired Batch'}
              </h2>
            </div>
            <span
              className={`px-3 py-1 rounded text-xs font-mono font-bold border ${details.isValid
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
            >
              {details.isValid ? 'VALID' : 'INACTIVE / EXPIRED'}
            </span>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <div className="text-slate-500">isVerified (Contract)</div>
              <div className="font-mono font-bold text-slate-900 mt-1">{String(details.isVerified)}</div>
            </div>
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <div className="text-slate-500">isAuthenticated (NFT Minted)</div>
              <div className="font-mono font-bold text-slate-900 mt-1">{String(details.isAuthenticated)}</div>
            </div>
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <div className="text-slate-500">isActive</div>
              <div className="font-mono font-bold text-slate-900 mt-1">{String(details.isActive)}</div>
            </div>
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <div className="text-slate-500">ERC-721 Token ID</div>
              <div className="font-mono font-bold text-slate-900 mt-1">
                {details.tokenId && details.tokenId !== '0' ? `#${details.tokenId}` : '0 (Not Minted)'}
              </div>
            </div>
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <div className="text-slate-500">isNFTValid</div>
              <div className="font-mono font-bold text-slate-900 mt-1">{String(details.isNFTValid)}</div>
            </div>
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <div className="text-slate-500">Expiry Timestamp</div>
              <div className="font-mono font-bold text-slate-900 mt-1">
                {details.expiryDate
                  ? `${new Date(Number(details.expiryDate) * 1000).toISOString().split('T')[0]} (${details.expiryDate})`
                  : 'N/A'}
              </div>
            </div>
            <div className="sm:col-span-2 lg:col-span-3 p-3 rounded bg-slate-50 border border-slate-200">
              <div className="text-slate-500">Manufacturer Address</div>
              <div className="font-mono text-slate-900 mt-1 break-all">{details.manufacturer}</div>
            </div>
          </div>

          <div className="px-5 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              On-Chain Owner Actions (requires Hardhat node running):
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={actionLoading !== null}
                onClick={() => handleToggleVerifyOnChain(!details.isVerified)}
                className="px-3.5 py-1.5 rounded bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-medium disabled:opacity-50"
              >
                {actionLoading === 'verify'
                  ? 'Sending Tx...'
                  : details.isVerified
                    ? 'Revoke Verify (verifyMedicine)'
                    : 'Approve Batch (verifyMedicine)'}
              </button>
              <button
                type="button"
                disabled={actionLoading !== null || details.tokenId !== '0'}
                onClick={handleMintNFT}
                className="px-3.5 py-1.5 rounded bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium disabled:opacity-50"
              >
                {actionLoading === 'mint'
                  ? 'Minting...'
                  : details.tokenId && details.tokenId !== '0'
                    ? `NFT #${details.tokenId} Minted`
                    : 'Mint ERC-721 NFT (authenticateBatch)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- ERC-721 NFT LEDGER ---
const NFTLedger = () => {
  const [manufacturer, setManufacturer] = useState('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
  const [nfts, setNfts] = useState<string[] | null>(null);
  const [nftLoading, setNftLoading] = useState(false);
  const [nftError, setNftError] = useState<string | null>(null);

  const [tokenIdInput, setTokenIdInput] = useState('1');
  const [tokenStatus, setTokenStatus] = useState<{ tokenId: string; valid: boolean } | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const fetchManufacturerNFTs = async (e?: FormEvent) => {
    e?.preventDefault();
    setNftLoading(true);
    setNftError(null);
    try {
      const res = await medishareService.getManufacturerNFTs(manufacturer.trim());
      setNfts(Array.isArray(res.data?.nfts) ? res.data.nfts : []);
    } catch (err: any) {
      setNfts(null);
      setNftError(err.response?.data?.error || err.message || 'Failed to query manufacturer NFTs.');
    } finally {
      setNftLoading(false);
    }
  };

  const checkToken = async (idToCheck: string) => {
    setTokenError(null);
    setTokenStatus(null);
    try {
      const res = await medishareService.checkNFTStatus(idToCheck.trim());
      setTokenStatus({ tokenId: idToCheck.trim(), valid: Boolean(res.data?.valid) });
    } catch (err: any) {
      setTokenError(err.response?.data?.error || err.message || 'Failed to check token status.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">ERC-721 NFT Ledger (MediAuthToken / MAT)</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Inspect minted authentication NFTs via <code className="font-mono text-xs">getManufacturerNFTs()</code> and{' '}
          <code className="font-mono text-xs">isNFTValid()</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Manufacturer Minted Tokens</h2>
          <form onSubmit={fetchManufacturerNFTs} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Manufacturer Address
              </label>
              <input
                type="text"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-mono text-slate-900"
              />
            </div>
            <button
              type="submit"
              disabled={nftLoading}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-md text-xs font-medium flex items-center gap-1.5"
            >
              {nftLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Award className="w-3.5 h-3.5" />}
              Fetch Manufacturer NFTs
            </button>
          </form>

          {nftError && <div className="text-xs text-red-700 bg-red-50 border border-red-200 p-3 rounded">{nftError}</div>}

          {nfts !== null && (
            <div className="border-t border-slate-200 pt-3">
              <div className="text-xs text-slate-600 mb-2">Found {nfts.length} minted token(s):</div>
              {nfts.length === 0 ? (
                <p className="text-xs text-slate-500">No NFTs minted for this address yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {nfts.map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setTokenIdInput(id);
                        checkToken(id);
                      }}
                      className="px-3 py-1.5 rounded bg-slate-100 hover:bg-teal-50 border border-slate-300 hover:border-teal-400 font-mono text-xs text-slate-900"
                    >
                      MAT #{id}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Check Token Validity (isNFTValid)</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Token ID (e.g. 1)"
              value={tokenIdInput}
              onChange={(e) => setTokenIdInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm font-mono text-slate-900"
            />
            <button
              type="button"
              onClick={() => checkToken(tokenIdInput)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-md text-xs font-medium"
            >
              Check Status
            </button>
          </div>

          {tokenError && (
            <div className="text-xs text-red-700 bg-red-50 border border-red-200 p-3 rounded">{tokenError}</div>
          )}

          {tokenStatus && (
            <div
              className={`p-4 rounded border text-sm font-mono ${tokenStatus.valid
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
            >
              Token #{tokenStatus.tokenId} → isNFTValid: <strong>{String(tokenStatus.valid)}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- DONATIONS ---
const Donations = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const [verifiedMeds, setVerifiedMeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedQtyMap, setSelectedQtyMap] = useState<Record<string, number>>({});
  const [quickDonatingId, setQuickDonatingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    medicineName: '',
    batchNumber: '',
    quantity: '',
    brand: '',
    rawDate: '',
    manufacturerDetails: '',
  });

  const fetchDonationsAndMeds = async () => {
    setLoading(true);
    try {
      const [donRes, medsRes] = await Promise.allSettled([
        medishareService.getAllDonations(),
        medishareService.getMedicines(),
      ]);
      if (donRes.status === 'fulfilled' && Array.isArray(donRes.value.data)) {
        setDonations(donRes.value.data);
      }
      if (medsRes.status === 'fulfilled' && Array.isArray(medsRes.value.data)) {
        setVerifiedMeds(medsRes.value.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonationsAndMeds();
  }, []);

  const handleQtyChange = (medId: string, delta: number) => {
    setSelectedQtyMap((prev) => ({
      ...prev,
      [medId]: Math.max(1, (prev[medId] || 10) + delta),
    }));
  };

  const handleQuickDonate = async (med: any) => {
    const qtyToDonate = selectedQtyMap[med._id] || 10;
    setQuickDonatingId(med._id);
    setMsg(null);
    try {
      await medishareService.submitDonation({
        medicineName: med.name,
        batchNumber: med.batchNumber || `BATCH-VER-${Math.floor(1000 + Math.random() * 9000)}`,
        quantity: Number(qtyToDonate),
        brand: med.brand || 'Verified Pharma',
        expiryDate: med.expirationDate
          ? typeof med.expirationDate === 'string'
            ? med.expirationDate.split('T')[0]
            : '2027-12-31'
          : '2027-12-31',
        manufacturerDetails: med.manufacturerDetails || med.manufacturer || 'Certified Facility',
      });
      setMsg(`Donated ${qtyToDonate} units of "${med.name}".`);
      fetchDonationsAndMeds();
    } catch (err: any) {
      setMsg(err.response?.data?.error || err.message || 'Donation submission failed.');
    } finally {
      setQuickDonatingId(null);
    }
  };

  const handleCustomSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    try {
      await medishareService.submitDonation({
        medicineName: form.medicineName.trim(),
        batchNumber: form.batchNumber.trim(),
        quantity: Number(form.quantity),
        brand: form.brand.trim(),
        expiryDate: form.rawDate,
        manufacturerDetails: form.manufacturerDetails.trim(),
      });
      setMsg(`Submitted donation of ${form.quantity} units of "${form.medicineName}".`);
      setForm({
        medicineName: '',
        batchNumber: '',
        quantity: '',
        brand: '',
        rawDate: '',
        manufacturerDetails: '',
      });
      fetchDonationsAndMeds();
    } catch (err: any) {
      setMsg(err.response?.data?.error || err.message || 'Failed to submit donation.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Surplus Medicine Donations</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Donate verified batches or submit unlisted medicines to the MongoDB donation pool.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchDonationsAndMeds}
          className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-md text-xs font-medium text-slate-700 flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {msg && (
        <div className="p-3.5 rounded-md bg-teal-50 border border-teal-200 text-teal-900 text-sm">
          {msg}
        </div>
      )}

      {/* Available Verified Medicines */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Registered Medicines ({verifiedMeds.length})
        </h2>

        {loading ? (
          <div className="text-sm text-slate-500 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading...
          </div>
        ) : verifiedMeds.length === 0 ? (
          <div className="p-6 bg-white border border-slate-200 rounded-lg text-sm text-slate-500">
            No medicines in database yet.{' '}
            <Link to="/medishare/generate" className="text-teal-700 underline">
              Register a batch first
            </Link>
            .
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {verifiedMeds.map((med: any) => {
              const currentQty = selectedQtyMap[med._id] || 10;
              return (
                <div
                  key={med._id}
                  className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{med.name}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Brand: {med.brand || 'Generic'} · Batch:{' '}
                      <span className="font-mono text-slate-800">{med.batchNumber || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-slate-300 rounded-md">
                      <button
                        type="button"
                        onClick={() => handleQtyChange(med._id, -5)}
                        className="p-1.5 hover:bg-slate-100 text-slate-700"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-mono font-semibold">{currentQty}</span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange(med._id, 5)}
                        className="p-1.5 hover:bg-slate-100 text-slate-700"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleQuickDonate(med)}
                      disabled={quickDonatingId === med._id}
                      className="flex-1 py-1.5 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-md text-xs font-medium disabled:opacity-50"
                    >
                      {quickDonatingId === med._id ? 'Submitting...' : 'Donate'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Custom Donation Form */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Submit Custom Donation</h2>
        <form onSubmit={handleCustomSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            required
            placeholder="Medicine Name *"
            value={form.medicineName}
            onChange={(e) => setForm({ ...form, medicineName: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm"
          />
          <input
            type="text"
            required
            placeholder="Batch Number *"
            value={form.batchNumber}
            onChange={(e) => setForm({ ...form, batchNumber: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm font-mono"
          />
          <input
            type="number"
            required
            placeholder="Quantity *"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Brand"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm"
          />
          <input
            type="date"
            required
            value={form.rawDate}
            onChange={(e) => setForm({ ...form, rawDate: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm"
          />
          <input
            type="text"
            required
            placeholder="Manufacturer Details *"
            value={form.manufacturerDetails}
            onChange={(e) => setForm({ ...form, manufacturerDetails: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-md text-sm"
          />
          <button
            type="submit"
            disabled={submitting}
            className="md:col-span-3 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-sm font-medium disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Donation'}
          </button>
        </form>
      </div>

      {/* Donation History Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 font-bold text-sm text-slate-900">
          Donation Records ({donations.length})
        </div>
        {donations.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">No donation records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 uppercase bg-slate-50/50">
                <tr>
                  <th className="px-4 py-2.5">Medicine</th>
                  <th className="px-4 py-2.5">Batch</th>
                  <th className="px-4 py-2.5">Quantity</th>
                  <th className="px-4 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {donations.map((d: any) => (
                  <tr key={d._id}>
                    <td className="px-4 py-2.5 font-medium text-slate-900">
                      {d.medicine || d.medicineName} ({d.brand || 'Generic'})
                    </td>
                    <td className="px-4 py-2.5 font-mono text-slate-700">{d.batchNumber}</td>
                    <td className="px-4 py-2.5">{d.quantity} units</td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono uppercase">
                        {d.status || 'pending'}
                      </span>
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

// --- STORE ---
const Store = () => {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    medishareService
      .getMedicines()
      .then((res) => setMedicines(Array.isArray(res.data) ? res.data : []))
      .catch(() => setMedicines([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Medicine Store Inventory</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Registered medicines stored in MongoDB with linked batch IDs.
        </p>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500 flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading medicines...
        </div>
      ) : medicines.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-sm text-slate-500">
          No medicines listed in store inventory (ensure MongoDB is connected and add a batch).
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3">Medicine</th>
                  <th className="px-4 py-3">Brand</th>
                  <th className="px-4 py-3">Batch Number</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {medicines.map((med: any) => (
                  <tr key={med._id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{med.name}</td>
                    <td className="px-4 py-3 text-slate-600">{med.brand || 'Generic'}</td>
                    <td className="px-4 py-3 font-mono text-slate-700">{med.batchNumber || 'N/A'}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">${med.price ?? 20}</td>
                    <td className="px-4 py-3 text-slate-700">{med.quantity ?? 50}</td>
                    <td className="px-4 py-3">
                      {med.batchNumber && (
                        <Link
                          to={`/medishare/verify?batch=${encodeURIComponent(med.batchNumber)}`}
                          className="inline-flex items-center gap-1 text-teal-700 hover:underline font-medium"
                        >
                          Verify <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN WORKSPACE SHELL ---
const MediShare = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-56 flex-shrink-0 space-y-1">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Workspace
        </div>
        <SidebarLink to="/medishare" icon={LayoutDashboard}>
          Overview
        </SidebarLink>
        <SidebarLink to="/medishare/generate" icon={QrCode}>
          Register &amp; QR
        </SidebarLink>
        <SidebarLink to="/medishare/verify" icon={ShieldCheck}>
          Verify &amp; Mint NFT
        </SidebarLink>
        <SidebarLink to="/medishare/nfts" icon={Award}>
          NFT Ledger
        </SidebarLink>
        <SidebarLink to="/medishare/donations" icon={HeartHandshake}>
          Donations
        </SidebarLink>
        <SidebarLink to="/medishare/store" icon={ShoppingBag}>
          Medicine Store
        </SidebarLink>
      </aside>

      <div className="flex-1 min-w-0">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/generate" element={<GenerateQR />} />
          <Route path="/generate-qr" element={<GenerateQR />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/nfts" element={<NFTLedger />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </div>
    </div>
  );
};

export default MediShare;
