import React from 'react';
import { DictionaryEntryExportFormat } from '@mothertongues/search';

// FPCC
import { CopyButton } from './copy-button';
import { DownloadButton } from './download-button';
import { AudioButton } from './audio-button';
import { FvLetter, FVMedia, FvWordLocationCombo } from '../common/data';

export interface SelectedLetterDisplayProps {
  dictionaryData: (DictionaryEntryExportFormat | FvWordLocationCombo)[];
  selected: FvLetter;
}

export function SelectedLetterDisplay({
  selected,
  dictionaryData,
}: Readonly<SelectedLetterDisplayProps>) {
  const audioCount = selected?.relatedAudio.length ?? 0;

  return (
    <>
      <div className="flex text-8xl justify-center pb-6">{selected?.title}</div>
      {audioCount === 0 && (
        <div className="flex w-full justify-center">
          <CopyButton selected={selected} />
          <DownloadButton selected={selected} dataDictionary={dictionaryData} />
        </div>
      )}
      {audioCount === 1 && (
        <div className="grid grid-cols-3">
          <CopyButton selected={selected} />
          <DownloadButton selected={selected} dataDictionary={dictionaryData} />
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
              dataDictionary={dictionaryData}
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
