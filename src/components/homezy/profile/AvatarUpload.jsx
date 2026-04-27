import { useRef, useState } from 'react'

const AvatarUpload = ({ user, onSave }) => {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(user?.avatar || '')

  const onFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const image = String(reader.result || '')
      setPreview(image)
      onSave?.(image)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="rounded-3xl border border-amber-100 bg-linear-to-br from-white via-amber-50/40 to-white p-5 shadow-xl shadow-amber-100/30">
      <p className="text-xs font-black uppercase tracking-widest text-blue-700">Portrait</p>
      <p className="mt-1 text-lg font-black text-slate-950">Avatar Photo</p>
      <p className="mt-1 text-xs text-slate-500">Upload a square image for the navbar avatar.</p>

      <div className="mt-4 flex items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-linear-to-br from-amber-300 via-white to-amber-600 blur-sm" />
          <div className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-slate-100 ring-4 ring-white">
            {preview ? (
              <img src={preview} alt={`${user?.name || 'User'} avatar`} className="h-full w-full object-cover" />
            ) : (
              <span className="text-3xl font-black text-slate-400">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
            )}
          </div>
        </div>

        <div>
          <input ref={inputRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-2xl bg-linear-to-r cursor-pointer from-blue-700 to-blue-600 px-4 py-2 text-sm font-black text-white shadow-lg shadow-amber-100 transition hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
          >
            Upload Avatar
          </button>
        </div>
      </div>
    </div>
  )
}

export default AvatarUpload
