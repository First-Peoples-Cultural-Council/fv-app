import { FaRegCopy } from 'react-icons/fa6'

export interface CopyButtonProps {
  selected: any
}

export function CopyButton({ selected }: Readonly<CopyButtonProps>) {
  return (
    <div id="CopyButton" className="flex justify-center items-center">
      <button
        data-testid="copy-btn"
        onClick={() => {
          navigator.clipboard.writeText(selected?.title ?? '').catch((err: any) => {
            console.error(err)
          })
        }}
      >
        <FaRegCopy className="text-3xl cursor-pointer" />
      </button>
    </div>
  )
}
