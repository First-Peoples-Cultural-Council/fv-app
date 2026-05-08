// FPCC
import Modal from 'components/common/modal/modal'

type ConfirmDialogProps = {
  title: string
  message: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: Readonly<ConfirmDialogProps>) {
  const closeModal = () => {
    onCancel()
  }

  const handleConfirm = () => {
    onConfirm()
    closeModal()
  }

  return (
    <Modal onClose={closeModal} showCloseButton={false} closeOnOutsideClick={false}>
      <div className="w-full text-center p-5 space-y-5">
        <div className="text-xl">{title}</div>
        <div className="text-pretty">{message}</div>
        <div className="mx-auto space-x-3">
          <button className="btn-outlined" onClick={closeModal}>
            {cancelLabel}
          </button>
          <button className="btn-contained bg-primary-300" onClick={handleConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
