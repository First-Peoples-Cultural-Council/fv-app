export interface ShareButtonProps {
  title: string
  text: string
  url: string
}

export function ShareButton(shareData: Readonly<ShareButtonProps>) {
  return (
    <button
      data-testid="share-button"
      className="flex items-center"
      onClick={() => {
        if (navigator.share && navigator.canShare(shareData)) {
          navigator.share(shareData).catch((err: any) => {
            console.error(err)
          })
        } else {
          navigator.clipboard.writeText(shareData.url).catch((err: any) => {
            console.error(err)
          })
        }
      }}
    >
      <i className="fv-share pr-2 text-xl" />
      <span className="text-lg">SHARE</span>
    </button>
  )
}

export default ShareButton
