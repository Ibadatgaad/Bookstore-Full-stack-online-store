const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('bookstore_token')

/**
 * Thin wrapper around fetch that:
 *  - prefixes the API base URL
 *  - sends/receives JSON
 *  - attaches the JWT (if present) as a Bearer token
 *  - throws an Error with the server's message on non-2xx responses
 */
export async function apiFetch(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    // response had no JSON body (e.g. some 204s) — that's fine
  }

  if (!res.ok) {
    const message = data?.message || `Request failed with status ${res.status}`
    throw new Error(message)
  }

  return data
}
