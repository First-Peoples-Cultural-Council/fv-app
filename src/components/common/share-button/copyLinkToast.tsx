import { useEffect } from 'react'

export interface CopyLinkToastProps {
  readonly message: string
  readonly duration?: number
  readonly onDone: () => void
}

export default function CopyLinkToast({ message, duration = 2000, onDone }: CopyLinkToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, duration)
    return () => clearTimeout(timer)
  }, [duration, onDone])

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center pointer-events-none p-4">
      <div className="bg-gray-800 text-white px-4 py-2 rounded shadow-lg opacity-90 max-w-xs w-full pointer-events-auto">
        {message}
      </div>
    </div>
  )
}
