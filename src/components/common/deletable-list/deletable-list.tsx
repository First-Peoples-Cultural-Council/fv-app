import { useRef, useState } from 'react';
import classNames from 'classnames';

// FPCC
import { DeleteListType } from '../data';
import useOnClickOutside from '../../../util/clickOutside';

interface Props {
  header: string;
  items: DeleteListType[];
  confirmMessage: string;
  removeButtonText: string;
  removeSelectedButtonText: string;
  onDelete: (ids: string[]) => void;
  onClick: (id: string) => void;
}

export function DeletableList({
  header,
  items,
  confirmMessage,
  removeButtonText,
  removeSelectedButtonText,
  onClick,
  onDelete,
}: Readonly<Props>) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const confirmModalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(confirmModalRef, () => {
    setShowConfirm(false);
  });

  const handleItemSelect = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selected: any) => selected !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleDeleteSelected = () => {
    onDelete(selectedItems);
    setSelectedItems([]);
    setShowConfirm(false);
    setShowDelete(false);
  };

  return (
    <>
      <div className="flex flex-col w-full p-2">
        <div className="flex items-center justify-end md:justify-between md:mx-2">
          <div className="hidden md:block text-xl mb-2">{header}</div>
          {!showDelete && (
            <div>
              <button
                onClick={() => setShowDelete(true)}
                className="btn-contained mb-2"
              >
                <span>{removeButtonText}</span>
              </button>
            </div>
          )}
          {showDelete && (
            <div className="mb-2">
              <button
                disabled={selectedItems.length === 0}
                onClick={() => {
                  setShowConfirm(true);
                }}
                className={classNames('btn-contained bg-secondary mr-2', {
                  'hover:bg-secondary-dark': selectedItems.length > 0,
                  'opacity-50': selectedItems.length <= 0,
                })}
              >
                <span>{removeSelectedButtonText}</span>
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setShowDelete(false);
                  setSelectedItems([]);
                }}
                className="btn-contained"
              >
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2 w-full pb-5">
          {items.map((item: DeleteListType) => {
            if (selectedItems.includes(item.id)) {
              return (
                <button
                  key={item.id}
                  type="button"
                  className="bg-secondary-100 flex w-full items-center rounded-lg shadow-md cursor-pointer outline outline-secondary outline-2"
                  onClick={() => handleItemSelect(item.id)}
                >
                  {item.display}
                </button>
              );
            } else {
              return (
                <button
                  key={item.id}
                  type="button"
                  className={classNames(
                    'flex w-full items-center rounded-lg bg-white shadow-md cursor-pointer outline outline-1 outline-slate-200',
                    showDelete
                      ? 'hover:bg-secondary-100 hover:outline-secondary-200'
                      : 'hover:bg-slate-100'
                  )}
                  onClick={() => {
                    if (showDelete) {
                      handleItemSelect(item.id);
                    } else {
                      onClick(item.id);
                    }
                  }}
                >
                  {item.display}
                </button>
              );
            }
          })}
        </div>
      </div>

      {showConfirm && (
        <div
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          className="fixed inset-0 w-full h-full backdrop"
        >
          <div className="grid h-screen place-items-center overflow-y-auto outline-none focus:outline-none">
            <div
              ref={confirmModalRef}
              className="p-5 md:p-10 grid gap-4 bg-white rounded-lg shadow-lg"
            >
              <div className="pb-4">
                <div className="text-xl text-center">{confirmMessage}</div>
              </div>
              <div className="grid grid-cols-2 place-items-center">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="btn-contained w-20"
                >
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleDeleteSelected}
                  className="btn-contained bg-secondary w-20"
                >
                  <span>Ok</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeletableList;
