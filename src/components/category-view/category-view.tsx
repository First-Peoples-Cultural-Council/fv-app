import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import styles from './category-view.module.css';
import fetchCategoryData from '../../services/categoriesApiService';
import { Fragment, useEffect, useState } from 'react';
import WordCardDesktop from '../dictionary-page/word-card-desktop';
import WordCardMobile from '../dictionary-page/word-card-mobile';
import { DictionaryType, FvCategory, FvWord } from '../common/data';
import MultiSwitch from '../common/multi-switch/multi-switch';
import fetchWordsData from '../../services/wordsApiService';

/* eslint-disable-next-line */
export interface CategoryViewProps {}

export function CategoryView(props: CategoryViewProps) {
  const { id } = useParams();

  const [selected, setSelected] = useState<number>(DictionaryType.Both);
  const [dataDict, setDataDict] = useState<FvWord[]>([]);
  const [data, setData] = useState<FvWord[]>([]);
  const [dataCategories, setDataCategories] = useState<FvCategory[]>([]);

  useEffect(() => {
    fetchCategoryData().then((result) => {
      setDataCategories(result);
    });
  }, []);

  const findCategoryById = (
    list: FvCategory[] | null,
    id: string
  ): FvCategory | undefined => {
    if (!list) return undefined;

    for (const category of list) {
      if (category.id === id) {
        return category;
      }

      const nestedCategory = findCategoryById(category.children ?? [], id);
      if (nestedCategory) {
        return nestedCategory;
      }
    }

    return undefined;
  };

  const findPrimaryCategoryById = (
    list: FvCategory[] | null,
    id: string
  ): FvCategory | undefined => {
    if (!list) return undefined;

    for (const category of list) {
      if (category.id === id) {
        return category;
      }

      const nestedCategory = findCategoryById(category.children ?? [], id);
      if (nestedCategory) {
        return category;
      }
    }

    return undefined;
  };

  const currentCategory: FvCategory = findCategoryById(
    dataCategories,
    id ?? ''
  ) ?? {
    id: '',
    description: '',
    url: '',
    title: '',
  };

  const primaryCategory =
    findPrimaryCategoryById(dataCategories, id ?? '') ?? currentCategory;

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchWordsData();
        setDataDict(result.data);
      } catch (error) {
        // Handle error scenarios
      }
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
    switch (selected) {
      case DictionaryType.Words: {
        setData(dataDict.filter((entry) => entry.source === 'words'));
        break;
      }
      case DictionaryType.Phrases: {
        setData(dataDict.filter((entry) => entry.source === 'phrases'));
        break;
      }
      default: {
        setData(dataDict);
        break;
      }
    }
  }, [selected, dataDict]);

  return (
    <>
      <div className="block md:hidden w-full">
        <div className="flex flex-auto">
          {selectedCategory()}
          {subcategories()}
        </div>
        <div className={'w-full'}>
          {wordsPhrasesBoth()}
          {data
            .filter((term) => {
              if (currentCategory.id === primaryCategory.id) {
                return term.theme === primaryCategory.title;
              } else {
                return (
                  term.theme === primaryCategory.title &&
                  term.secondary_theme === currentCategory.title
                );
              }
            })
            .map((term) => {
              return (
                <Fragment key={`${term.source}-${term.entryID}`}>
                  <WordCardMobile term={term} />
                </Fragment>
              );
            })}{' '}
        </div>
      </div>

      <div className="flex flex-row hidden md:block pr-5">
        <div className={styles['container']}>
          <div className="flex flex-row">
            <div
              className={classNames(
                'overflow-y-auto mr-8',
                styles['catsSubCatsContainer']
              )}
            >
              <div>
                {selectedCategory()}
                {subcategories()}
              </div>
              <div className="border-gray-700 border-solid border w-full mt-5 mb-5" />
              <div>
                {dataCategories
                  .filter((category) => category.id !== primaryCategory.id)
                  .map((category) => {
                    return (
                      <Link
                        key={category.id}
                        to={`/categories/${category.id}`}
                        className={classNames(
                          'flex items-center cursor-pointer mb-6 hover:opacity-75'
                        )}
                      >
                        <i
                          className={classNames(
                            'fv-categories',
                            'text-3xl hover:opacity-75'
                          )}
                        />
                        <div className="pt-2 text-lg">{category.title}</div>
                      </Link>
                    );
                  })}
              </div>
            </div>

            <div>
              {wordsPhrasesBoth()}
              <div
                className={classNames(
                  'overflow-y-auto',
                  styles['wordsPhrasesContainer']
                )}
              >
                {data
                  .filter((term) => {
                    if (currentCategory === primaryCategory) {
                      return term.theme === primaryCategory.title;
                    } else {
                      return (
                        term.theme === primaryCategory.title &&
                        term.secondary_theme === currentCategory.title
                      );
                    }
                  })
                  .map((term) => {
                    return (
                      <Fragment key={`${term.source}-${term.entryID}`}>
                        <WordCardDesktop term={term} />
                      </Fragment>
                    );
                  })}
                <div className="h-48" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function selectedCategory() {
    return (
      <Link
        to={`/categories/${primaryCategory.id}`}
        className={classNames(
          'transition duration-500 ease-in-out rounded-lg pr-4 flex items-center cursor-pointer text-tertiaryB bg-gray-300 p-2 mt-2 hover:opacity-75'
        )}
      >
        <i
          className={classNames('fv-categories', 'text-3xl hover:opacity-75')}
        />
        <div className="inline-flex text-lg font-medium">
          {primaryCategory.title}
        </div>
      </Link>
    );
  }

  function subcategories() {
    return (
      <>
        {primaryCategory?.children?.map((subCategory) => {
          return (
            <Link
              key={subCategory.id}
              to={`/categories/${subCategory.id}`}
              className={classNames(
                'mt-2 transition duration-500 ease-in-out ml-4 lg:ml-8 pr-4 lg:px-0 rounded-lg flex items-center cursor-pointer hover:opacity-75',
                {
                  'bg-gray-300 rounded-md':
                    subCategory.id === currentCategory.id,
                }
              )}
            >
              <div className="inline-flex text-lg font-medium pl-2 hover:opacity-75">
                {subCategory.title}
              </div>
            </Link>
          );
        })}
      </>
    );
  }

  function wordsPhrasesBoth() {
    return (
      <MultiSwitch
        selected={selected}
        items={[
          { name: 'WORDS', icon: 'fv-words' },
          { name: 'PHRASES', icon: 'fv-quote-right' },
          { name: 'BOTH', icon: null },
        ]}
        onToggle={(index: number) => {
          setSelected(index);
        }}
      />
    );
  }
}

export default CategoryView;
