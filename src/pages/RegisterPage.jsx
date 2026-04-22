import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Input, Modal, Navbar } from '../components'
import { useRegisterForm } from '../hooks/useAuthForm'
import { registerUser } from '../services/authService'
import { cn } from '../utils/cn'

const roles = ['student', 'family', 'foreigner', 'broker']

const getStrength = (password) => {
  let score = 0
  if (password.length >= 8) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  return score
}

const RegisterPage = () => {
  const navigate = useNavigate()
  const { values, errors, onChange, setRole, validate, reset } = useRegisterForm()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const passwordStrength = useMemo(() => getStrength(values.password), [values.password])

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')
    if (!validate()) return

    setIsLoading(true)
    try {
      await registerUser(values)
      setIsSuccessOpen(true)
      reset()
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar showSwitchRole={false} />

      <main className="px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <Card className="p-6 sm:p-8">
            <h1 className="text-center text-4xl font-bold text-primary-800">Create your horizon</h1>
            <p className="mt-2 text-center text-neutral-600">Join Egypt&apos;s most curated real estate ecosystem.</p>

            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-neutral-500">I am a...</p>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {roles.map((role) => {
                const active = values.role === role
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setRole(role)}
                    className={cn(
                      'rounded-md border p-3 text-center text-xs font-semibold uppercase',
                      active ? 'border-primary-700 bg-primary-50 text-primary-800' : 'border-neutral-200 bg-neutral-100 text-neutral-600',
                    )}
                  >
                    {role}
                  </button>
                )
              })}
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={values.fullName}
                  onChange={onChange}
                  error={errors.fullName}
                />
                <Input id="email" name="email" label="Email Address" value={values.email} onChange={onChange} error={errors.email} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={values.phoneNumber}
                  onChange={onChange}
                  error={errors.phoneNumber}
                />
                <div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={values.password}
                    onChange={onChange}
                    error={errors.password}
                  />
                  <div className="mt-2 grid grid-cols-4 gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <span key={level} className={cn('h-1.5 rounded-full', level <= passwordStrength ? 'bg-success' : 'bg-neutral-200')} />
                    ))}
                  </div>
                </div>
              </div>

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                value={values.confirmPassword}
                onChange={onChange}
                error={errors.confirmPassword}
              />

              {submitError ? (
                <div className="rounded-md border border-error/20 bg-error/10 px-3 py-2 text-sm text-error">{submitError}</div>
              ) : null}

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Build My Account
              </Button>
            </form>

            <div className="my-6 h-px bg-neutral-200" />

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline">Google</Button>
              <Button variant="outline">LinkedIn</Button>
            </div>

            <p className="mt-6 text-center text-sm text-neutral-600">
              Already a member?{' '}
              <Link to="/login" className="font-semibold text-primary-700 hover:text-primary-800">
                Sign In
              </Link>
            </p>
          </Card>
        </div>
      </main>

      <Modal
        isOpen={isSuccessOpen}
        title="Account Created"
        message="Your account was created successfully. Continue to login."
        onClose={() => {
          setIsSuccessOpen(false)
          navigate('/login')
        }}
      />
    </div>
  )
}

export default RegisterPage
