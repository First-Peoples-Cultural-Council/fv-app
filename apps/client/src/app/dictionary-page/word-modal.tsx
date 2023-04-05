import { FvWord } from '@fv-app/common-components';
import WordCard from './word-card';

function WordModal({ term }: FvWord) {
  const { word } = term;

  return (
    <div className="p-10">
      <div className="flex text-2xl">
        <p className="grow font-bold text-3xl">{word}</p>
        <div className="grid grid-cols-2 divide-solid divide-black divide-x">
          <div className="pl-2 pr-2">
            <i className="fv-copy pr-2" />
            <button
              onClick={() => {
                navigator.clipboard.writeText(word);
              }}
            >
              <span className="text-xl">COPY</span>
            </button>
          </div>
          <div className="pl-2 pr-2">
            <button
              onClick={() => {
                console.log('clicked share');
              }}
            >
              <i className="fv-share pr-2" />
              <span className="text-xl">SHARE</span>
            </button>
          </div>
        </div>
      </div>
      <WordCard term={term} />
    </div>
  );
}

export default WordModal;
