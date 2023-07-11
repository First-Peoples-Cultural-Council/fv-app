import classNames from 'classnames';
import { useButtonStyle } from '../hooks';
import Modal from '../modal/modal';

type ConfirmDialogProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  title,
  message,
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

  const primaryButtonStyle = useButtonStyle('primary', 'button');
  const secondaryButtonStyle = useButtonStyle('secondary', 'button');

  return (
    <Modal title={title} onClose={closeModal} showCloseButton={false}>
      <div className="p-4">{message}</div>
      <div className="flex justify-end">
        <div className="p-4">
          <button
            className={classNames('mr-2', primaryButtonStyle)}
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className={classNames('mr-2', secondaryButtonStyle)}
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
