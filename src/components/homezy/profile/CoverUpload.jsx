import { useRef, useState } from 'react'

const DEFAULT_COVER = '/HomezyLogo.jpeg'

const CoverUpload = ({ user, onSave }) => {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(user?.cover || DEFAULT_COVER)

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
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-44 bg-linear-to-br from-slate-950 via-blue-900 to-emerald-700">
        <img src={preview} alt={`${user?.name || 'User'} cover`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/20" />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-sm font-black">Cover Photo</p>
          <p className="text-xs text-white/80">Upload a banner image for the profile header.</p>
        </div>
      </div>

      <div className="p-5">
        <input ref={inputRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-2xl bg-blue-700 px-4 py-2 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-blue-800 active:scale-[0.98]"
        >
          Upload Cover
        </button>
      </div>
    </div>
  )
}

export default CoverUpload
