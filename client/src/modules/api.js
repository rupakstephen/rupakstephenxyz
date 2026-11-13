import { createContext, useContext } from 'react';

// Tiny fetch wrapper: JSON in/out, throws Error(msg) on non-2xx.
export async function api(path, method = 'GET', body) {
  const res = await fetch('/api' + path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.msg || res.statusText);
  return json;
}

export const AuthContext = createContext({ admin: false, setAdmin: () => {} });
export const useAuth = () => useContext(AuthContext);
