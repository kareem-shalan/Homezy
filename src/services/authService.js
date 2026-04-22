import httpClient from './httpClient'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const mockAuthAdapter = async (config) => {
  await delay(800)

  const payload = JSON.parse(config.data ?? '{}')

  if (config.url?.includes('/login')) {
    const emailOrPhone = String(payload.emailOrPhone || '').trim().toLowerCase()
    const password = String(payload.password || '').trim()

    if (emailOrPhone !== 'admin@gmail.com' || password !== 'admin') {
      return {
        data: { message: 'Invalid credentials. Use admin@gmail.com / admin.' },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config,
      }
    }
    return {
      data: { message: 'Welcome back!', token: 'mock-token', user: { fullName: 'Admin User' } },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    }
  }

  if (payload.email?.toLowerCase().includes('taken')) {
    return {
      data: { message: 'Email is already registered.' },
      status: 409,
      statusText: 'Conflict',
      headers: {},
      config,
    }
  }

  return {
    data: { message: 'Account created successfully.' },
    status: 201,
    statusText: 'Created',
    headers: {},
    config,
  }
}

const parseError = (error) => {
  const message = error.response?.data?.message || 'Unexpected error occurred. Please try again.'
  return new Error(message)
}

export const loginUser = async (payload) => {
  try {
    const response = await httpClient.post('/auth/login', payload, { adapter: mockAuthAdapter })
    return response.data
  } catch (error) {
    throw parseError(error)
  }
}

export const registerUser = async (payload) => {
  try {
    const response = await httpClient.post('/auth/register', payload, { adapter: mockAuthAdapter })
    return response.data
  } catch (error) {
    throw parseError(error)
  }
}
