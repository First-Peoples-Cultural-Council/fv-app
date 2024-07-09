import { FVMedia } from '../common/data';
import React from 'react';

async function playAudio(fileName: string) {
  const audio = new Audio(fileName);
  audio.play().catch((err: any) => {
    console.error(err);
  });
}

export interface FvAudioButtonProps {
  fvAudio: FVMedia;
}

export function FvAudioButton({ fvAudio }: Readonly<FvAudioButtonProps>) {
  return (
    <div
      data-testid={`alphabet-view-audio-${fvAudio.id}`}
      key={fvAudio.url}
      className="flex justify-center items-center"
    >
      <button onClick={() => playAudio(fvAudio.original.path)}>
        <span className="fv-volume-up text-3xl justify-self-end cursor-pointer" />
      </button>
    </div>
  );
}
