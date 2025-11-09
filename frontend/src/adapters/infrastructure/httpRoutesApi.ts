import axios from 'axios';
import { RoutesApi } from '../../core/ports/RoutesApi';

const BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:4000';

export const httpRoutesApi = (): RoutesApi => ({
  async list() {
    const { data } = await axios.get(`${BASE}/routes`);
    return data;
  },
  async setBaseline(routeId: string) {
    await axios.post(`${BASE}/routes/${routeId}/baseline`);
  },
  async comparison() {
    const { data } = await axios.get(`${BASE}/routes/comparison`);
    return data;
  }
});
