import React, { createContext, useContext, useState, useEffect } from 'react'
import * as authApi from '../api/auth'

const AuthContext = createContext(null)
const TOKEN_KEY = 'bookstore_token'
const USER_KEY = 'bookstore_user'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY)
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // On mount, if we have a token, verify it's still valid and refresh the user
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return
    authApi
      .getMe()
      .then(({ user }) => {
        setUser(user)
        localStorage.setItem(USER_KEY, JSON.stringify(user))
      })
      .catch(() => {
        // token expired/invalid — clear stale session
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        setUser(null)
      })
  }, [])

  const persistSession = ({ token, user }) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    setUser(user)
  }

  const signup = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authApi.signup(payload)
      persistSession(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const login = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authApi.login(payload)
      persistSession(data)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signup, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
