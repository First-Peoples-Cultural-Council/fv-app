// FPCC
import Modal from 'components/common/modal/modal'

type ConfirmDialogProps = {
  title: string
  message: string
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
      <div className="w-full text-center text-3xl mb-5">{title}</div>
      <div className="p-4">{message}</div>
      <div className="flex justify-end">
        <div className="p-4">
          <button className="btn-contained bg-secondary-500 mr-2" onClick={handleConfirm}>
            {confirmLabel}
          </button>
          <button className="btn-contained bg-primary-500 mr-2" onClick={closeModal}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
