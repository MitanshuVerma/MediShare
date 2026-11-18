import axios from 'axios';

const MEDISHARE_API = import.meta.env.VITE_MEDISHARE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: MEDISHARE_API,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('medishare_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const medishareService = {
  // System Health
  checkHealth: async () => api.get('/'),

  // Auth
  register: async (data: Record<string, unknown>) => api.post('/users/register', data),
  login: async (data: Record<string, unknown>) => {
    const res = await api.post('/users/login', data);
    if (res.data?.token) {
      localStorage.setItem('medishare_token', res.data.token);
      if (res.data?.user) {
        localStorage.setItem('medishare_user', JSON.stringify(res.data.user));
      }
    }
    return res;
  },
  logout: async () => {
    localStorage.removeItem('medishare_token');
    localStorage.removeItem('medishare_user');
    return api.post('/users/logout');
  },
  getProfile: async () => api.get('/users/profile'),

  // Blockchain Smart Contract Operations
  verifyBatch: async (batchNumber: string) => {
    return api.get(`/chain/api/verify/${encodeURIComponent(batchNumber)}`);
  },
  addMedicineBatch: async (data: Record<string, unknown>) => {
    return api.post('/chain/api/medicines/add', data);
  },
  verifyMedicineBatch: async (batchNumber: string, status: boolean) => {
    return api.patch('/chain/api/medicines/verify', { batchNumber, status });
  },
  mintNFT: async (batchNumber: string) => {
    return api.post('/chain/api/nfts/mint', { batchNumber });
  },
  getManufacturerNFTs: async (manufacturer: string) => {
    return api.get(`/chain/api/nfts/${encodeURIComponent(manufacturer)}`);
  },
  checkNFTStatus: async (tokenId: string) => {
    return api.get(`/chain/api/nft/status/${encodeURIComponent(tokenId)}`);
  },

  // Donations
  submitDonation: async (data: Record<string, unknown>) => api.post('/users/donation/', data),
  getUserDonations: async (userId: string) => api.get(`/users/donation/user/${userId}`),
  getAllDonations: async () => api.get('/users/donation/'),
  updateDonationStatus: async (id: string, status: string, adminResponse?: string) =>
    api.patch(`/users/donation/${id}`, { status, adminResponse }),

  // Store / Inventory
  getMedicines: async () => api.get('/ecommerce/medicine'),
  addMedicine: async (data: Record<string, unknown>) => api.post('/ecommerce/medicine', data),
  getMedicineDetails: async (id: string) => api.get(`/ecommerce/medicine/${id}`),
};
