const USERS_KEY = 'homezy_users'
const CURRENT_USER_KEY = 'homezy_current_user'
const DEFAULT_COVER = '/HomezyLogo.jpeg'

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const normalizeEmail = (email) => String(email || '').trim().toLowerCase()

const withoutPassword = (user) => {
  const { password: _password, ...safeUser } = user
  return safeUser
}

export const getUsers = () => readJson(USERS_KEY, [])

export const getCurrentUser = () => readJson(CURRENT_USER_KEY, null)

export const register = (userData) => {
  const name = String(userData?.name || '').trim()
  const email = normalizeEmail(userData?.email)
  const password = String(userData?.password || '')

  const users = getUsers()
  const existingUser = users.find((user) => normalizeEmail(user.email) === email)

  if (existingUser) {
    throw new Error('This email is already registered.')
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    avatar: '',
    cover: DEFAULT_COVER,
    createdAt: new Date().toISOString(),
  }

  writeJson(USERS_KEY, [user, ...users])
  writeJson(CURRENT_USER_KEY, withoutPassword(user))

  return withoutPassword(user)
}

export const login = (email, password) => {
  const normalizedEmail = normalizeEmail(email)
  const users = getUsers()
  const user = users.find((item) => normalizeEmail(item.email) === normalizedEmail && item.password === password)

  if (!user) {
    throw new Error('Invalid email or password.')
  }

  const currentUser = withoutPassword(user)
  writeJson(CURRENT_USER_KEY, currentUser)
  return currentUser
}

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export const updateCurrentUser = (updates) => {
  const currentUser = getCurrentUser()
  if (!currentUser) {
    throw new Error('No active user found.')
  }

  const nextUser = { ...currentUser, ...updates, updatedAt: new Date().toISOString() }
  const users = getUsers().map((user) => (user.id === nextUser.id ? { ...user, ...updates } : user))

  writeJson(USERS_KEY, users)
  writeJson(CURRENT_USER_KEY, nextUser)

  return nextUser
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  updateCurrentUser,
}
