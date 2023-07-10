import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { dataCategories } from '../temp-category-list';
import { useButtonStyle } from '../common/hooks';
import { FvAudio, FvWord } from '../common/data';
import { FvImage } from '../common/image/image';
import { AudioButton } from '../common/audio-button/audio';

function WordCard(props: { term: FvWord }) {
  const { term } = props;
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');

  const primaryCategory = dataCategories.find(
    (category) => category.id === term.theme
  );

  const secondaryCategory = dataCategories.find(
    (category) => category.id === term.secondary_theme
  );

  return (
    <>
      <p className="italic">
        {term.optional?.map((element) => {
          if (element['Part of Speech'] !== undefined) {
            return `(${element['Part of Speech']}) `;
          } else {
            return '';
          }
        })}
      </p>
      <p className="pt-10 pb-10">{term.definition}</p>
      {term.audio?.map((fvAudio: FvAudio) => (
        <AudioButton fvAudio={fvAudio}/>
      ))}
      {term.img && (
        <FvImage
          className="pt-10 max-w-sm max-h-sm"
          src={term.img}
          alt={term.word}
        />
      )}
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

export default WordCard;
