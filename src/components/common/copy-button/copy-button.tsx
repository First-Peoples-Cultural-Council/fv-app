import { useNotification } from 'components/contexts/notificationContext'
import { ALERT_TYPES } from 'constants/notification-types'

export interface CopyButtonProps {
  label?: string
  text: string | null | undefined
}

export function CopyButton({ label, text }: Readonly<CopyButtonProps>) {
  const { setNotification } = useNotification()

  if (!text) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setNotification({
        type: ALERT_TYPES.SUCCESS,
        message: 'Success! The link has been copied to your clipboard.',
      })
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
      } else {
        console.error('Unknown error copying to clipboard.', err)
      }
      setNotification({
        type: ALERT_TYPES.ERROR,
        message: 'Failed to copy to clipboard.',
      })
    }
  }

  return (
    <button type="button" data-testid="copy-btn" className="flex items-center" onClick={handleCopy}>
      <i className="fv-copy pr-2 text-xl" />
      <span className="text-lg">{label ?? 'COPY'}</span>
    </button>
  )
}

export default CopyButton
