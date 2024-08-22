import { cloneElement, ReactElement, useEffect, useState } from 'react'
import { usePopper } from 'react-popper'

export interface TooltipProps {
  children: ReactElement
  label: string
}

export function Tooltip({ children, label }: TooltipProps) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
  const { styles: popperStyles, attributes } = usePopper(ref, popperElement, {
    placement: 'top-end',
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsOpen(true)
    }

    const handleMouseLeave = () => {
      setIsOpen(false)
    }

    if (ref) {
      ref.addEventListener('mouseenter', handleMouseEnter)
      ref.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (ref) {
        ref.removeEventListener('mouseenter', handleMouseEnter)
        ref.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [ref])

  return (
    <>
      {cloneElement(children, { ref: setRef })}
      {isOpen && (
        <div
          ref={setPopperElement}
          style={popperStyles['popper']}
          {...attributes['popper']}
          className="print:hidden bg-white rounded shadow-md p-2 text-sm font-normal text-gray-800 max-w-xs"
        >
          {label}
        </div>
      )}
    </>
  )
}

export default Tooltip
