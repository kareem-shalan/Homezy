import { useCallback, useMemo, useState } from 'react'
import {
  getCurrentUser,
  login as loginUser,
  logout as logoutUser,
  register as registerUser,
  updateCurrentUser,
} from '../../services/homezy/authService'
import { HomezyAuthContext } from './authContextValue'

export const HomezyAuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser)

  const register = useCallback((payload) => {
    const nextUser = registerUser(payload)
    setUser(nextUser)
    return nextUser
  }, [])

  const login = useCallback((email, password) => {
    const nextUser = loginUser(email, password)
    setUser(nextUser)
    return nextUser
  }, [])

  const logout = useCallback(() => {
    logoutUser()
    setUser(null)
  }, [])

  const updateUser = useCallback((updates) => {
    const nextUser = updateCurrentUser(updates)
    setUser(nextUser)
    return nextUser
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      register,
      login,
      logout,
      updateUser,
    }),
    [login, logout, register, updateUser, user],
  )

  return <HomezyAuthContext.Provider value={value}>{children}</HomezyAuthContext.Provider>
}

export default HomezyAuthProvider
