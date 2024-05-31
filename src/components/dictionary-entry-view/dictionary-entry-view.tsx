import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// FPCC

import WordModal from '../dictionary-view/word-modal';
import { FvWord, isFvWord } from '../common/data';
import { useAudio } from '../contexts/audioContext';
import PageNotFound from '../page-not-found/page-not-found';
import BackButton from '../common/back-button/back-button';
import { useDictionaryData } from '../dictionary-page/dictionary-page';

/* eslint-disable-next-line */
export interface DictionaryEntryViewProps {}

function DictionaryEntryView(props: Readonly<DictionaryEntryViewProps>) {
  const { id } = useParams();
  const { stopAll } = useAudio();
  const { dictionaryHash } = useDictionaryData();

  const [dictionaryEntry, setDictionaryEntry] = useState<
    FvWord | null | undefined
  >(null);

  useEffect(() => {
    if (dictionaryHash && id && !dictionaryEntry) {
      const entry = dictionaryHash?.[id];
      setDictionaryEntry(entry);
    }
  }, [id, dictionaryEntry, dictionaryHash]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <div className="container mx-auto h-full text-left px-4 mb-14 w-full overflow-auto">
        <div className="flex h-14 items-center justify-left w-full">
          <BackButton />
        </div>
        {dictionaryEntry === undefined && <PageNotFound />}
        {isFvWord(dictionaryEntry) && (
          <WordModal
            term={dictionaryEntry}
            onClose={() => {
              stopAll();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default DictionaryEntryView;
