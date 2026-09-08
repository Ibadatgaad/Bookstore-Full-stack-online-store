import { apiFetch } from './client'

export const signup = ({ name, email, password }) =>
  apiFetch('/auth/signup', { method: 'POST', body: { name, email, password } })

export const login = ({ email, password }) =>
  apiFetch('/auth/login', { method: 'POST', body: { email, password } })

export const getMe = () => apiFetch('/auth/me', { auth: true })
