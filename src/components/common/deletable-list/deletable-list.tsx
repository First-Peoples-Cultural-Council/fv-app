import { useRef, useState } from 'react';
import { DeleteListType } from '../data';
import useOnClickOutside from '../../../util/clickOutside';
import classNames from 'classnames';

interface Props {
  header: string;
  items: DeleteListType[];
  onDelete: (ids: string[]) => void;
  onClick: (id: string) => void;
}

function DeletableList({ header, items, onClick, onDelete }: Props) {
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
      <div className="h-[70px]">
        <div className="float-left text-4xl m-2">{header}</div>
        <div className="float-right">
          {!showDelete && (
            <button
              onClick={() => setShowDelete(true)}
              className="m-2 bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
            >
              <span>Delete</span>
            </button>
          )}
          {showDelete && (
            <>
              <button
                onClick={() => setShowConfirm(true)}
                className="m-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                <span>Delete Selected</span>
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setShowDelete(false);
                  setSelectedItems([]);
                }}
                className="m-2 bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
              >
                <span>Cancel</span>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        {items.map((item: DeleteListType) => (
          <div
            key={item.id}
            className={classNames(
              'flex items-center block rounded-lg bg-white m-1 shadow-lg cursor-pointer outline outline-slate-200 outline-1',
              selectedItems.includes(item.id) ? 'bg-red-200' : '',
              showDelete ? 'hover:bg-red-100' : 'hover:bg-slate-100'
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
          </div>
        ))}
      </div>

      {showConfirm && (
        <div
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          className="fixed inset-0 w-full h-full backdrop"
        >
          <div className="grid h-screen place-items-center overflow-y-auto outline-none focus:outline-none">
            <div ref={confirmModalRef} className="p-4 grid bg-white">
              <div className="pb-4">
                <div className="text-2xl">Delete selected bookmarks?</div>
              </div>
              <div className="grid grid-cols-2 place-items-center">
                <button
                  onClick={handleDeleteSelected}
                  className="m-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-20"
                >
                  <span>Yes</span>
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="m-2 bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded w-20"
                >
                  <span>No</span>
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
