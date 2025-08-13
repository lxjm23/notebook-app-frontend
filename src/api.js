// export const BACKEND_URL = "http://localhost:3000/"
// const BACKEND_URL = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

const RAW = process.env.REACT_APP_API_BASE || 'http://localhost:3001';
export const API_BASE = (RAW || '').replace(/\/+$/, '');
export const apiUrl = (path='/') => `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;