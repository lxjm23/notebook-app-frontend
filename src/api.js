// export const BACKEND_URL = "http://localhost:3000/"
// const BACKEND_URL = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

const RAW = process.env.REACT_APP_API_BASE || 'http://localhost:3001';
export const API_BASE = (RAW || '').replace(/\/+$/, '');
export const apiUrl = (path = '/') =>
  `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;

export async function fetchWithRetry(url, options = {}, retries = 3, backoff = 800) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res;
  } catch (err) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 1.6);
    }
    throw err;
  }
}
