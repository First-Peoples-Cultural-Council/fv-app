import { useRef, useState } from 'react';
import { DeleteListType } from '../data';
import useOnClickOutside from '../../../util/clickOutside';
import SearchInput from '../search-input/search-input';

interface Props {
  header: string;
  items: DeleteListType[];
  showSearch: boolean;
  confirmMessage: string;
  removeButtonText: string;
  removeSelectedButtonText: string;
  onDelete: (ids: string[]) => void;
  onClick: (id: string) => void;
}

function DeletableList({
  header,
  items,
  showSearch,
  confirmMessage,
  removeButtonText,
  removeSelectedButtonText,
  onClick,
  onDelete,
}: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

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
              <span>{removeButtonText}</span>
            </button>
          )}
          {showDelete && (
            <>
              <button
                disabled={selectedItems.length === 0}
                onClick={() => {
                  setShowConfirm(true);
                }}
                className={`m-2 bg-red-500 ${
                  selectedItems.length !== 0 ? 'hover:bg-red-600' : 'opacity-50'
                } text-white font-bold py-2 px-4 rounded `}
              >
                <span>{removeSelectedButtonText}</span>
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
      {showSearch && (
        <div className="mb-4">
          <SearchInput
            value={searchValue}
            onChange={(event) => setSearchValue(event?.target?.value)}
            clickSearch={() => console.log(`search for ${searchValue}`)}
          />
        </div>
      )}
      <div className="flex flex-col">
        {items.map((item: DeleteListType) => {
          if (selectedItems.includes(item.id)) {
            return (
              <div
                key={item.id}
                className={`bg-red-300 flex items-center block rounded-lg m-1 shadow-lg cursor-pointer outline outline-slate-200 outline-1}`}
                onClick={() => handleItemSelect(item.id)}
              >
                {item.display}
              </div>
            );
          } else {
            return (
              <div
                key={item.id}
                className={`flex items-center block rounded-lg bg-white m-1 shadow-lg cursor-pointer outline outline-slate-200 outline-1 ${
                  showDelete ? 'hover:bg-red-100' : 'hover:bg-slate-100'
                }`}
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
            );
          }
        })}
      </div>

      {showConfirm && (
        <div
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          className="fixed inset-0 w-full h-full backdrop"
        >
          <div className="grid h-screen place-items-center overflow-y-auto outline-none focus:outline-none">
            <div ref={confirmModalRef} className="p-4 grid bg-white">
              <div className="pb-4">
                <div className="text-2xl">{confirmMessage}</div>
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
