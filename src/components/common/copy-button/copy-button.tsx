import React from 'react';

export interface CopyButtonProps {
  text: string | null | undefined;
}

export function CopyButton({ text }: Readonly<CopyButtonProps>) {
  return text ? (
    <button
      data-testid="copy-btn"
      className="flex items-center"
      onClick={async () => {
        await navigator.clipboard.writeText(text ?? '').catch((err: any) => {
          console.error(err);
        });
      }}
    >
      <i className="fv-copy pr-2 text-xl" />
      <span className="text-lg">COPY</span>
    </button>
  ) : (
    <></>
  );
}

export default CopyButton;
