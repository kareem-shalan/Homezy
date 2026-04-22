import { useState } from 'react'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const useLoginForm = () => {
  const [values, setValues] = useState({ emailOrPhone: '', password: '' })
  const [errors, setErrors] = useState({})

  const onChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!values.emailOrPhone.trim()) nextErrors.emailOrPhone = 'Email or phone is required.'
    if (!values.password.trim()) nextErrors.password = 'Password is required.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  return { values, errors, onChange, validate }
}

export const useRegisterForm = () => {
  const [values, setValues] = useState({
    role: 'student',
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  const onChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const setRole = (role) => setValues((prev) => ({ ...prev, role }))

  const validate = () => {
    const nextErrors = {}
    if (!values.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!emailRegex.test(values.email)) nextErrors.email = 'Enter a valid email.'
    if (!/^\d{10,15}$/.test(values.phoneNumber)) nextErrors.phoneNumber = 'Enter 10-15 digits.'
    if (values.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.'
    if (values.confirmPassword !== values.password) nextErrors.confirmPassword = 'Passwords do not match.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const reset = () => {
    setValues({
      role: 'student',
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    })
    setErrors({})
  }

  return { values, errors, onChange, setRole, validate, reset }
}
