import { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'homezy_auth'

const readInitialAuth = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { token: null, user: null }
    const parsed = JSON.parse(raw)
    return { token: parsed.token || null, user: parsed.user || null }
  } catch {
    return { token: null, user: null }
  }
}

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(readInitialAuth)

  const login = (payload) => {
    const nextAuth = { token: payload?.token || null, user: payload?.user || null }
    setAuth(nextAuth)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAuth))
  }

  const logout = () => {
    const nextAuth = { token: null, user: null }
    setAuth(nextAuth)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      token: auth.token,
      user: auth.user,
      isAuthenticated: Boolean(auth.token),
      login,
      logout,
    }),
    [auth.token, auth.user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.')
  }
  return context
}
