import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Input, Modal, Navbar } from '../components'
import { useAuth } from '../context'
import PageTransition from '../components/homezy/animations/PageTransition'
import ScaleHover from '../components/homezy/animations/ScaleHover'
import SlideUp from '../components/homezy/animations/SlideUp'
import { useRegisterForm } from '../hooks/useAuthForm'
import { registerUser } from '../services/authService'
import { cn } from '../utils/cn'

const backgroundImage = '/download.png'

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
  const { login } = useAuth()
  const { values, errors, onChange, setRole, validate, reset } = useRegisterForm()
  const [avatarPreview, setAvatarPreview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const passwordStrength = useMemo(() => getStrength(values.password), [values.password])

  const onAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setAvatarPreview(String(reader.result || ''))
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')
    if (!validate()) return

    setIsLoading(true)
    try {
      const authData = await registerUser({ ...values, avatar: avatarPreview })
      login(authData)
      reset()
      setAvatarPreview('')
      navigate('/profile')
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
    style={{ backgroundImage: `url(${backgroundImage})` }}
    className="min-h-screen bg-neutral-100 
    bg-no-repeat
    bg-cover
    bg-blend-multiply
    
    
    
    bg-center">
      <Navbar showSwitchRole={false} />

      <main className="px-4 py-8
      
      bg-black/40
      ">
        <PageTransition>
          <div className="mx-auto max-w-2xl">
            <SlideUp>
              <Card className="p-6 sm:p-8">
            <h1 className="text-center text-4xl font-bold text-primary-800">Create your horizon</h1>
            <p className="mt-2 text-center text-neutral-600">Join Egypt&apos;s most curated real estate ecosystem.</p>

            <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-full bg-primary-100 text-3xl font-black text-primary-700 ring-4 ring-white">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
                  ) : (
                    values.fullName?.charAt(0)?.toUpperCase() || 'U'
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-neutral-900">Profile photo</p>
                  <p className="mt-1 text-xs text-neutral-500">Upload your avatar now. It will appear in the navbar after login.</p>
                  <label className="mt-3 inline-flex cursor-pointer rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-800">
                    Upload Photo
                    <input type="file" accept="image/*" onChange={onAvatarChange} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

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

              <ScaleHover glow>
                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Build My Account
                </Button>
              </ScaleHover>
            </form>

            <div className="my-6 h-px bg-neutral-200" />

            <div className="grid grid-cols-2 gap-3">
              {['Google', 'LinkedIn'].map((provider, index) => (
                <SlideUp key={provider} delay={index * 0.05}>
                  <ScaleHover>
                    <Button variant="outline">{provider}</Button>
                  </ScaleHover>
                </SlideUp>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-neutral-600">
              Already a member?{' '}
              <Link to="/login" className="font-semibold text-primary-700 hover:text-primary-800">
                Sign In
              </Link>
            </p>
              </Card>
            </SlideUp>
          </div>
        </PageTransition>
      </main>

      <Modal
        isOpen={isSuccessOpen}
        title="Account Created"
        message="Your account was created successfully. You are now signed in."
        onClose={() => {
          setIsSuccessOpen(false)
          navigate('/profile')
        }}
      />
    </div>
  )
}

export default RegisterPage
