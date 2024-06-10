import { FvWordLocation } from '../components/common/data';

export const applyHighlighting = (
  str: string,
  wordLocations: FvWordLocation[],
  type: string
) => {
  if (!wordLocations) {
    return str;
  }

  if (wordLocations.length === 0) {
    return str;
  }

  const highlightingLocations = wordLocations.filter((locationTuple) => {
    return locationTuple[0] === type;
  });

  const firstLocation = highlightingLocations[0];

  if (!firstLocation) {
    return str;
  }
  const wordArray = str.split(' ');
  const word = wordArray[firstLocation[1]];
  const before = wordArray.slice(0, firstLocation[1]).join(' ');
  const after = wordArray.slice(firstLocation[1] + 1).join(' ');

  return (
    <>
      {before} <span className="font-bold px-1 bg-word-200">{word}</span>{' '}
      {after}
    </>
  );
};
