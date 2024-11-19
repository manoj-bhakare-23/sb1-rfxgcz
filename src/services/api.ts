import axios from 'axios';
import { SecureStorage } from '@nativescript/secure-storage';

const API_URL = 'http://localhost:3000/api';
const secureStorage = new SecureStorage();

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await secureStorage.getSync({ key: 'token' });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    await secureStorage.setSync({
      key: 'token',
      value: response.data.token
    });
  }
  return response.data;
};

export const submitLoanLead = async (leadData: any) => {
  const response = await api.post('/leads/personal-loan', leadData);
  return response.data;
};

export const getLeads = async () => {
  const response = await api.get('/leads');
  return response.data;
};

export default api;