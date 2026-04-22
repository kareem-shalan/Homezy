import { useEffect } from 'react'
import Button from './Button'

const Modal = ({ isOpen, title, message, onClose }) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-soft">
        <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
        <p className="mt-2 text-sm text-neutral-700">{message}</p>
        <div className="mt-5 flex justify-end">
          <Button onClick={onClose}>Okay</Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
