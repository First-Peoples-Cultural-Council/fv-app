import React from 'react';

// FPCC
import { CopyButton } from './copy-button';
import { DownloadButton } from './download-button';
import { AudioButton } from './audio-button';
import { FvCharacter, FVMedia, FvWord } from '../common/data';

export interface SelectedLetterDisplayProps {
  dictionaryData: FvWord[] | [];
  selected: FvCharacter;
}

export function SelectedLetterDisplay({
  selected,
  dictionaryData,
}: Readonly<SelectedLetterDisplayProps>) {
  const audioCount = selected?.relatedAudio.length ?? 0;

  return (
    <>
      <div className="flex text-8xl justify-center pb-8 md:pb-4">
        {/* NB Bottom padding necessary to preserve space for characters with tails and underscores */}
        {selected?.title}
      </div>
      {audioCount === 0 && (
        <div className="flex w-full justify-center">
          <CopyButton selected={selected} />
          <DownloadButton selected={selected} dictionaryData={dictionaryData} />
        </div>
      )}
      {audioCount === 1 && (
        <div className="grid grid-cols-3">
          <CopyButton selected={selected} />
          <DownloadButton selected={selected} dictionaryData={dictionaryData} />
          {selected?.relatedAudio.map((fvAudio: FVMedia) => {
            return <AudioButton key={fvAudio.id} fvAudio={fvAudio} />;
          })}
        </div>
      )}
      {audioCount > 1 && (
        <>
          <div className="flex w-full justify-center">
            <CopyButton selected={selected} />
          </div>
          <div className="flex w-full justify-center">
            <DownloadButton
              selected={selected}
              dictionaryData={dictionaryData}
            />
          </div>
          <div className="flex justify-evenly mt-5">
            {selected?.relatedAudio.map((fvAudio: FVMedia) => {
              return <AudioButton key={fvAudio.id} fvAudio={fvAudio} />;
            })}
          </div>
        </>
      )}
    </>
  );
}
