import { FVMedia } from '../common/data';
import React from 'react';

async function playAudio(fileName: string) {
  const audio = new Audio(fileName);
  audio.play().catch((err: any) => {
    console.error(err);
  });
}

export interface AudioButtonProps {
  fvAudio: FVMedia;
}

export function AudioButton({ fvAudio }: Readonly<AudioButtonProps>) {
  return (
    <div key={fvAudio.url} className="flex justify-center items-center">
      <button onClick={() => playAudio(fvAudio.url)}>
        <span className="fv-volume-up text-4xl justify-self-end cursor-pointer" />
      </button>
    </div>
  );
}
