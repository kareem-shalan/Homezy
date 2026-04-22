import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context'
import {
  HomePage,
  LoginPage,
  PropertiesPage,
  PropertyDetailsPage,
  RegisterPage,
  StudentDashboardPage,
} from './pages'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/home" replace />
  return children
}

const App = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? '/home' : '/login'} replace />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/properties"
        element={
          <ProtectedRoute>
            <PropertiesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/properties/:id"
        element={
          <ProtectedRoute>
            <PropertyDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <StudentDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />
      <Route path="*" element={<Navigate to={isAuthenticated ? '/home' : '/login'} replace />} />
    </Routes>
  )
}

export default App
