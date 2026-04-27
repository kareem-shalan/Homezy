import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Input, Modal, Navbar } from '../components'
import { useAuth } from '../context'
import PageTransition from '../components/homezy/animations/PageTransition'
import ScaleHover from '../components/homezy/animations/ScaleHover'
import SlideUp from '../components/homezy/animations/SlideUp'
import { useLoginForm } from '../hooks/useAuthForm'
import { loginUser } from '../services/authService'

const backgroundImage = '/download.png'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { values, errors, onChange, validate } = useLoginForm()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    if (!validate()) return

    setIsLoading(true)
    try {
      const authData = await loginUser(values)
      login(authData)
      setIsSuccessOpen(true)
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
          <div className="mx-auto max-w-md
        
      
    
        ">
            <SlideUp>
              <Card className="p-6 sm:p-8">
                <div className="text-center">
                  <img className="animate-pulse text-3xl font-bold text-primary-800" src="/Logo.png" alt="Homezy Logo" />
                  <p className="text-sm text-neutral-600">Curating Modern Egyptian Living</p>
                </div>

                <h2 className="mt-8 text-3xl font-bold text-neutral-900">Welcome back</h2>
                <p className="mt-2 text-sm text-neutral-600">Please enter your details to access your curated dashboard.</p>

                <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
                  <Input
                    id="emailOrPhone"
                    name="emailOrPhone"
                    label="Email or Phone"
                    placeholder="Enter your email or phone"
                    value={values.emailOrPhone}
                    onChange={onChange}
                    error={errors.emailOrPhone}
                  />

                  <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={onChange}
                    error={errors.password}
                  />

                  {submitError ? (
                    <div className="rounded-md border border-error/20 bg-error/10 px-3 py-2 text-sm text-error">{submitError}</div>
                  ) : null}

                  <ScaleHover glow>
                    <Button type="submit" className="w-full" isLoading={isLoading}>
                      Log In
                    </Button>
                  </ScaleHover>
                </form>

                <div className="my-6 h-px bg-neutral-200" />

                <div className="grid grid-cols-3 gap-2">
                  {['Google', 'LinkedIn', 'Apple'].map((provider, index) => (
                    <SlideUp key={provider} delay={index * 0.05}>
                      <ScaleHover>
                        <Button variant="outline">{provider}</Button>
                      </ScaleHover>
                    </SlideUp>
                  ))}
                </div>

                <p className="mt-6 text-center text-sm text-neutral-600">
                  Don&apos;t have an account?{' '}
                  <Link to="/register" className="font-semibold text-primary-700 hover:text-primary-800">
                    Create Account
                  </Link>
                </p>
              </Card>
            </SlideUp>
          </div>
        </PageTransition>
      </main>

      <Modal
        isOpen={isSuccessOpen}
        title="Login Successful"
        message="You are now signed in. Continue to your dashboard."
        onClose={() => {
          setIsSuccessOpen(false)
          navigate('/student')
        }}
      />
    </div>
  )
}

export default LoginPage
