import { FvWordLocation } from '../components/common/data';

export const applyHighlighting = (
  str: string,
  wordLocations: FvWordLocation[] | null,
  type: string
) => {
  if (!wordLocations) {
    return str;
  }

  console.log('str: ', str);
  if (wordLocations.length === 0) {
    return str;
  }

  const highlightingLocations = wordLocations.filter((locationTuple) => {
    return locationTuple[0] === type;
  });

  const firstLocation = highlightingLocations[0];
  console.log('firstLocation: ', firstLocation);

  if (!firstLocation) {
    return str;
  }

  const word = str.split(' ').slice(firstLocation[1]);
  const before = str.split(' ').slice(0, firstLocation[1]).join(' ');
  const after = str
    .split(' ')
    .slice(firstLocation[1] + 1)
    .join(' ');

  return (
    <>
      {before}
      <span className="text-highlight">{word}</span>
      {after}
    </>
  );
};
