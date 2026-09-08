import { apiFetch } from './client'

export const getBooks = ({ category, search, sort } = {}) => {
  const params = new URLSearchParams()
  if (category && category !== 'All') params.set('category', category)
  if (search) params.set('search', search)
  if (sort && sort !== 'default') params.set('sort', sort)
  const qs = params.toString()
  return apiFetch(`/books${qs ? `?${qs}` : ''}`)
}

export const getMyBooks = () => apiFetch('/books/mine', { auth: true })

export const createBook = (book) =>
  apiFetch('/books', { method: 'POST', body: book, auth: true })

export const deleteBook = (id) =>
  apiFetch(`/books/${id}`, { method: 'DELETE', auth: true })
