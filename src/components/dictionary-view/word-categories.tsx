import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// FPCC
import { FvCategory, FvWord } from '../common/data';
import fetchCategoryData from '../../services/categoriesApiService';

export interface WordCategoriesProps {
  term: FvWord;
  categoryPressed: () => void;
}

function WordCategories({
  term,
  categoryPressed,
}: Readonly<WordCategoriesProps>) {
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

  return primaryCategory !== undefined || secondaryCategory !== undefined ? (
    <div data-testid="word-categories">
      <p className="pb-2">CATEGORIES</p>
      <div className="space-y-1">
        {primaryCategory !== undefined && (
          <Link
            to={`/categories/${primaryCategory.id}`}
            className="btn-contained bg-tertiaryB mr-1 whitespace-nowrap"
            onClick={categoryPressed}
          >
            {primaryCategory?.title}
          </Link>
        )}
        {secondaryCategory !== undefined && (
          <Link
            to={`/categories/${secondaryCategory.id}`}
            className="btn-contained bg-tertiaryB mr-1 whitespace-nowrap"
            onClick={categoryPressed}
          >
            {secondaryCategory?.title}
          </Link>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default WordCategories;
