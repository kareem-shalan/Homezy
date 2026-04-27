const USERS_KEY = 'homezy_users'
const DEFAULT_COVER = '/HomezyLogo.jpeg'

const adminUser = {
  id: 'admin-kareem-shalan',
  role: 'student',
  fullName: 'Kareem Shalan',
  email: 'admin@gmail.com',
  phoneNumber: '01012345678',
  university: 'Tanta University',
  location: 'Tanta, Egypt',
  avatar: '/MyPhoto.jpg',
  cover: DEFAULT_COVER,
  createdAt: '2024-01-01T00:00:00.000Z',
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const readUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

const writeUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

const normalizeEmail = (email) => String(email || '').trim().toLowerCase()

const removePassword = (user) => {
  const { password: _password, ...safeUser } = user
  return safeUser
}

const makeToken = (userId) => `mock-token-${userId}`

export const loginUser = async (payload) => {
  await delay(500)

  const emailOrPhone = normalizeEmail(payload.emailOrPhone)
  const password = String(payload.password || '').trim()

  if (emailOrPhone === 'admin@gmail.com' && password === 'admin') {
    return { message: 'Welcome back!', token: makeToken(adminUser.id), user: adminUser }
  }

  const users = readUsers()
  const user = users.find((item) => normalizeEmail(item.email) === emailOrPhone && item.password === password)

  if (!user) {
    throw new Error('Invalid credentials. Use admin@gmail.com / admin or a registered account.')
  }

  return { message: 'Welcome back!', token: makeToken(user.id), user: removePassword(user) }
}

export const registerUser = async (payload) => {
  await delay(500)

  const email = normalizeEmail(payload.email)
  const users = readUsers()
  const existingUser = users.find((item) => normalizeEmail(item.email) === email)

  if (email === adminUser.email || existingUser) {
    throw new Error('Email is already registered.')
  }

  const user = {
    id: crypto.randomUUID(),
    role: payload.role || 'student',
    fullName: String(payload.fullName || '').trim(),
    email,
    phoneNumber: String(payload.phoneNumber || '').trim(),
    password: payload.password,
    university: '',
    location: '',
    avatar: payload.avatar || '',
    cover: DEFAULT_COVER,
    createdAt: new Date().toISOString(),
  }

  writeUsers([user, ...users])

  return { message: 'Account created successfully.', token: makeToken(user.id), user: removePassword(user) }
}

export const updateStoredUser = (userUpdates) => {
  if (!userUpdates?.id || userUpdates.id === adminUser.id) {
    return { ...adminUser, ...userUpdates }
  }

  const users = readUsers()
  const nextUsers = users.map((user) => (user.id === userUpdates.id ? { ...user, ...userUpdates } : user))
  writeUsers(nextUsers)
  return removePassword(nextUsers.find((user) => user.id === userUpdates.id) || userUpdates)
}
