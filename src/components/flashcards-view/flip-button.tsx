import React from 'react';

export interface FlipButtonProps {
  handleClick: () => void;
}

export function FlipButton({ handleClick }: Readonly<FlipButtonProps>) {
  return (
    <button
      className="absolute bottom-2 text-center w-1/3 rounded-md italic text-white bg-tertiaryB-600"
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      flip card
    </button>
  );
}
