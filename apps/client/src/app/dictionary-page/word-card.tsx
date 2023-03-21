import { FvWord, useButtonStyle } from '@fv-app/common-components';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { dataCategories } from '../temp-category-list';

function WordCard({
  word,
  definition,
  audio,
  img,
  optional,
  theme,
  secondary_theme,
}: FvWord) {
  const secondaryButtonStyle = useButtonStyle('secondary', 'button');
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');

  const primaryCategory = dataCategories.find(
    (category) => category.id === theme
  );

  const secondaryCategory = dataCategories.find(
    (category) => category.id === secondary_theme
  );

  return (
    <>
      <p className="italic">
        {optional !== null &&
          optional.map((element) => {
            if (element['Part of Speech'] !== undefined) {
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
      <p className="pt-10 pb-2">CATEGORIES</p>
      {primaryCategory !== undefined && (
        <Link
          to={`/categories/${primaryCategory.id}`}
          className={classNames('mr-2', tertiaryButtonStyle)}
        >
          {primaryCategory?.name}
        </Link>
      )}
      {secondaryCategory !== undefined && (
        <Link
          to={`/categories/${secondaryCategory.id}`}
          className={classNames('mr-2', tertiaryButtonStyle)}
        >
          {secondaryCategory?.name}
        </Link>
      )}
    </>
  );
}

async function playAudio(fileName: string) {
  const audio = new Audio(fileName);
  audio.play();
}

export default WordCard;
