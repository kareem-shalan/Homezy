import { useState } from 'react'
import useAuth from '../../../hooks/homezy/useAuth'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setMessage('')
  }

  const validate = () => {
    const nextErrors = {}
    if (!emailRegex.test(values.email)) nextErrors.email = 'Enter a valid email.'
    if (!values.password.trim()) nextErrors.password = 'Password is required.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    try {
      const user = login(values.email, values.password)
      setMessage(`Welcome back, ${user.name}.`)
      onSuccess?.(user)
    } catch (error) {
      setErrors({ form: error.message })
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl" noValidate>
      <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Homezy Auth</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">Login</h2>
      <p className="mt-2 text-sm text-slate-500">Access your saved profile, avatar, cover photo, and requests.</p>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-bold text-slate-700">Email</span>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="you@homezy.com"
          />
          {errors.email ? <p className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p> : null}
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">Password</span>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={onChange}
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="Your password"
          />
          {errors.password ? <p className="mt-1 text-xs font-semibold text-red-600">{errors.password}</p> : null}
        </label>
      </div>

      {errors.form ? <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errors.form}</p> : null}
      {message ? <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</p> : null}

      <button
        type="submit"
        className="mt-6 w-full rounded-2xl bg-linear-to-r from-blue-700 to-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-100 transition hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
