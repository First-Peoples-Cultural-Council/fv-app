import React from 'react';

export interface CopyButtonProps {
  selected: any;
}

export function CopyButton({ selected }: Readonly<CopyButtonProps>) {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => {
          navigator.clipboard
            .writeText(selected?.title ?? '')
            .catch((err: any) => {
              console.error(err);
            });
        }}
      >
        <span className="fv-copy text-4xl cursor-pointer" />
      </button>
    </div>
  );
}
