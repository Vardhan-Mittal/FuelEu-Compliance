import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:4000';

export const complianceApi = {
  cb: async (shipId: string, year: number, actual:number, fuelT:number) => {
    const { data } = await axios.get(`${BASE}/compliance/cb`, { params: { shipId, year, actual, fuelT } });
    return data as { shipId: string; year: number; target: number; actual: number; fuelT: number; cb: number };
  },
  adjusted: async (shipId: string, year: number) => {
    const { data } = await axios.get(`${BASE}/compliance/adjusted-cb`, { params: { shipId, year } });
    return data;
  }
};

export const bankingApi = {
  records: async (shipId: string, year: number) => {
    const { data } = await axios.get(`${BASE}/banking/records`, { params: { shipId, year } });
    return data as { totalBanked: number; entries: { amount: number; createdAt: string }[] };
  },
  bank: async (shipId: string, year: number, amount: number) => {
    const { data } = await axios.post(`${BASE}/banking/bank`, { shipId, year, amount });
    return data;
  },
  apply: async (shipId: string, year: number, amount: number) => {
    const { data } = await axios.post(`${BASE}/banking/apply`, { shipId, year, amount });
    return data;
  },
};

export const poolsApi = {
  create: async (year: number, members: { shipId: string; cbBefore: number }[]) => {
    const { data } = await axios.post(`${BASE}/pools`, { year, members });
    return data as { year:number; members: { shipId:string; cbBefore:number; cbAfter:number }[]; sum:number };
  }
};
