import classNames from 'classnames';
import { Link } from 'react-router-dom';
// TODO: REPLACE
import { dataCategories } from '../temp-category-list';
import { useButtonStyle } from '../common/hooks';
import { FvAudio, FvCategory, FvWord } from '../common/data';
import { FvImage } from '../common/image/image';
import { AudioButton } from '../common/audio-button/audio';

function WordCard(props: { term: FvWord }) {
  const { term } = props;
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');

  const findCategoryByTitle = (
    list: FvCategory[] | null,
    title: string
  ): FvCategory | undefined => {
    if (!list) return undefined;

    for (const category of list) {
      if (category.title === title) {
        return category;
      }

      const nestedCategory = findCategoryByTitle(
        category.children ?? [],
        title
      );
      if (nestedCategory) {
        return nestedCategory;
      }
    }

    return undefined;
  };

  const primaryCategory = findCategoryByTitle(
    dataCategories,
    term?.theme ?? ''
  );

  const secondaryCategory = findCategoryByTitle(
    dataCategories,
    term?.secondary_theme ?? ''
  );

  return (
    <>
      <p className="italic">
        {term.optional &&
        term.optional['Part of Speech' as keyof typeof term.optional]
          ? `(${term.optional['Part of Speech' as keyof typeof term.optional]})`
          : ' '}
      </p>
      <p className="pt-10 pb-10">{term.definition}</p>
      {term.audio?.map((fvAudio: FvAudio) => (
        <AudioButton key={fvAudio.filename} fvAudio={fvAudio} />
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
          {primaryCategory?.title}
        </Link>
      )}
      {secondaryCategory !== undefined && (
        <Link
          to={`/categories/${secondaryCategory.id}`}
          className={classNames('mr-2', tertiaryButtonStyle)}
        >
          {secondaryCategory?.title}
        </Link>
      )}
    </>
  );
}

export default WordCard;
