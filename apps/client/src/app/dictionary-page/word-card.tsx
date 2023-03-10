import { FvWord, useButtonStyle } from '@fv-app/common-components';

function WordCard({ word, definition, audio, img, optional, theme }: FvWord) {
  const secondaryButtonStyle = useButtonStyle('secondary', 'button');
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');

  return (
    <>
      <p className="italic">
        {optional != null &&
          optional.map((element) => {
            if (element['Part of Speech'] !== null) {
              return `(${element['Part of Speech']}) `;
            } else {
              return '';
            }
          })}
      </p>
      <p className="pt-10 pb-10">{definition}</p>
      {audio != null &&
        audio.map((fvAudio) => (
          <button
            key={fvAudio.filename}
            className={secondaryButtonStyle}
            onClick={() => playAudio(fvAudio.filename)}
          >
            <i className="fv-play">{fvAudio.speaker}</i>
          </button>
        ))}
      {img && <img className="pt-10 max-w-md max-h-md" src={img} alt={word} />}
      <p className="pt-10">CATEGORIES</p>
      <button className={tertiaryButtonStyle}>{theme}</button>
    </>
  );
}

async function playAudio(fileName: string) {
  const audio = new Audio(fileName);
  audio.play();
}

export default WordCard;
