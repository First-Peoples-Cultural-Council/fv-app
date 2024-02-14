import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyButton } from './copy-button';
import { DownloadButton } from './download-button';
import { AudioButton } from './audio-button';
import { FVMedia } from '../common/data';

export interface SelectedLetterDisplayProps {
  selected: any;
  setSelected: (letter: any) => void;
  setShowMobileWordList: (show: boolean) => void;
  promptForDownload: () => void;
}

export function SelectedLetterDisplay({
  selected,
  setSelected,
  setShowMobileWordList,
  promptForDownload,
}: Readonly<SelectedLetterDisplayProps>) {
  const audioCount = selected?.relatedAudio.length ?? 0;
  const navigate = useNavigate();

  return (
    <>
      <button
        className="fv-close float-right block md:hidden"
        onClick={() => {
          setSelected(null);
          setShowMobileWordList(false);
          navigate('/alphabet');
        }}
      />
      <div className="flex text-8xl justify-center pb-6">{selected?.title}</div>
      {audioCount === 0 && (
        <div className="flex w-full justify-center">
          <CopyButton selected={selected} />
          <DownloadButton promptForDownload={promptForDownload} />
        </div>
      )}
      {audioCount === 1 && (
        <div className="grid grid-cols-3">
          <CopyButton selected={selected} />
          <DownloadButton promptForDownload={promptForDownload} />
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
            <DownloadButton promptForDownload={promptForDownload} />
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
