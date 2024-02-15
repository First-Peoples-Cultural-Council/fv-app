import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useButtonStyle } from '../common/hooks';
import { FvAudio, FvCategory, FvWord } from '../common/data';
import { FvImage } from '../common/image/image';
import { AudioButton } from '../common/audio-button/audio';
import { useEffect, useState } from 'react';
import fetchCategoryData from '../../services/categoriesApiService';

function WordCard(
  props: Readonly<{
    term: FvWord;
    categoryPressed: () => void;
  }>
) {
  const { term, categoryPressed } = props;
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');
  const [dataCategories, setDataCategories] = useState<FvCategory[] | null>(
    null
  );

  useEffect(() => {
    fetchCategoryData().then((result) => {
      setDataCategories(result);
    });
  }, []);

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
    <div className="p-5">
      <p className="italic">
        {term?.optional?.['Part of Speech' as keyof typeof term.optional]
          ? `(${term.optional['Part of Speech' as keyof typeof term.optional]})`
          : ' '}
      </p>
      <p className="pt-20 pb-10">{term.definition}</p>
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
          onClick={categoryPressed}
        >
          {primaryCategory?.title}
        </Link>
      )}
      {secondaryCategory !== undefined && (
        <Link
          to={`/categories/${secondaryCategory.id}`}
          className={classNames('mr-2', tertiaryButtonStyle)}
          onClick={categoryPressed}
        >
          {secondaryCategory?.title}
        </Link>
      )}
    </div>
  );
}

export default WordCard;
