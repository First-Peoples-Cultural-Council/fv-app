import { useNotification } from 'components/contexts/notificationContext'

export interface CopyButtonProps {
  label?: string
  text: string | null | undefined
}

export function CopyButton({ label, text }: Readonly<CopyButtonProps>) {
  const { setNotification } = useNotification()
  return text ? (
    <button
      data-testid="copy-btn"
      className="flex items-center"
      onClick={() => {
        navigator.clipboard
          .writeText(text ?? '')
          .then(() => {
            setTimeout(() => {
              setNotification({
                type: 'SUCCESS',
                message: 'Success! The link has been copied to your clipboard.',
              })
            }, 100)
          })
          .catch((err: any) => {
            console.error(err)
          })
      }}
    >
      <i className="fv-copy pr-2 text-xl" />
      <span className="text-lg">{label ?? 'COPY'}</span>
    </button>
  ) : (
    <></>
  )
}

export default CopyButton
