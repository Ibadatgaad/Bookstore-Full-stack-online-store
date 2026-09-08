import { apiFetch } from './client'

export const createOrder = ({ items, shippingAddress }) =>
  apiFetch('/orders', { method: 'POST', body: { items, shippingAddress }, auth: true })

export const getMyOrders = () => apiFetch('/orders/mine', { auth: true })

export const getOrderById = (id) => apiFetch(`/orders/${id}`, { auth: true })
