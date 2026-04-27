import { useContext } from 'react'
import { HomezyAuthContext } from '../../context/homezy/authContextValue'

export const useAuth = () => {
  const context = useContext(HomezyAuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside HomezyAuthProvider.')
  }

  return context
}

export default useAuth
