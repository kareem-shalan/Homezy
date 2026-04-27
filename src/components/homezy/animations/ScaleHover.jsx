const ScaleHover = ({ children, className = '', glow = false, press = true }) => {
  return (
    <div
      className={[
        'rounded-3xl  transition-[transform,box-shadow,filter] duration-300 ease-out will-change-transform hover:scale-[1.03] hover:shadow-xl focus-within:scale-[1.03] focus-within:shadow-xl motion-reduce:transform-none motion-reduce:transition-none',
        press ? 'active:scale-[0.98]' : '',
        glow ? 'hover:brightness-105 focus-within:brightness-105' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export default ScaleHover
