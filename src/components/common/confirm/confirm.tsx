import Modal from '../modal/modal';

type ConfirmDialogProps = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const closeModal = () => {
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <Modal title={title} onClose={closeModal} showCloseButton={false} closeOnOutsideClick={false}>
      <div className="p-4">{message}</div>
      <div className="flex justify-end">
        <div className="p-4">
          <button
            className="btn-contained bg-secondary mr-2"
            onClick={handleConfirm}
          >
            {confirmLabel}
          </button>
          <button
            className="btn-contained bg-primary mr-2"
            onClick={closeModal}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
