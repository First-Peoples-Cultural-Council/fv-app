import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import styles from './category-view.module.css';
import { dataCategories } from '../temp-category-list';
import { DictionaryType, MultiSwitch } from '@fv-app/common-components';
import { Fragment, useEffect, useState } from 'react';
import { dataDict } from '../temp-word-list';
import WordCardDesktop from '../dictionary-page/word-card-desktop';
import WordCardMobile from '../dictionary-page/word-card-mobile';

/* eslint-disable-next-line */
export interface CategoryViewProps {}

export function CategoryView(props: CategoryViewProps) {
  const { id } = useParams();

  const [selected, setSelected] = useState<number>(DictionaryType.Both);
  const [data, setData] = useState(dataDict);

  const currentCategory = dataCategories.find(
    (category) => category.id === id
  ) ?? {
    id: '',
    name: '',
    icon: '',
    parent: null,
  };

  const primaryCategory =
    dataCategories.find(
      (category) =>
        category.id === currentCategory.parent && currentCategory.parent != null
    ) ?? currentCategory;

  const subCategories = dataCategories.filter(
    (category) => category.parent === primaryCategory.id
  );

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
  }, [selected]);

  return (
    <>
      <div className="block md:hidden w-full">
        <div className="flex flex-auto">
          {selectedCategory()}
          {subcategories()}
        </div>
        <div className={"w-full"}>
          {wordsPhrasesBoth()}
          {data
            .filter((term) => {
              if (currentCategory === primaryCategory) {
                return term.theme === primaryCategory.id;
              } else {
                return (
                  term.theme === primaryCategory.id &&
                  term.secondary_theme === currentCategory.id
                );
              }
            })
            .map((term) => {
              return (
                <Fragment key={`${term.source}-${term.entryID}`}>
                  <WordCardMobile
                    word={term.word}
                    definition={term.definition}
                    audio={term.audio}
                    img={term.img}
                    source={term.source}
                    entryID={term.entryID}
                    theme={term.theme}
                    secondary_theme={term.secondary_theme}
                    optional={term.optional}
                    compare_form={term.compare_form}
                    sort_form={term.sort_form}
                    sorting_form={term.sorting_form}
                  />
                </Fragment>
              );
            })}{' '}
        </div>
      </div>

      <div className="flex flex-row hidden md:block">
        <div className={styles['container']}>
          <div className="flex flex-row">
            <div className="min-w-400 mr-8">
              <div>
                {selectedCategory()}
                {subcategories()}
              </div>
              <div className="border-gray-700 border-solid border w-full mt-5 mb-5" />
              <div className="">
                {dataCategories
                  .filter(
                    (category) => category.parent == null && category.id !== id
                  )
                  .map((category) => {
                    return (
                      <Link
                        to={`/categories/${category.id}`}
                        className={classNames(
                          'flex items-center cursor-pointer mb-6 hover:opacity-75'
                        )}
                      >
                        <i
                          className={classNames(
                            category.icon ?? 'fv-categories',
                            'text-3xl hover:opacity-75'
                          )}
                        />
                        <div className="pt-2 text-lg">{category.name}</div>
                      </Link>
                    );
                  })}
              </div>
            </div>

            <div>
              {wordsPhrasesBoth()}
              {data
                .filter((term) => {
                  if (currentCategory === primaryCategory) {
                    return term.theme === primaryCategory.id;
                  } else {
                    return (
                      term.theme === primaryCategory.id &&
                      term.secondary_theme === currentCategory.id
                    );
                  }
                })
                .map((term) => {
                  return (
                    <Fragment key={`${term.source}-${term.entryID}`}>
                      <WordCardDesktop
                        word={term.word}
                        definition={term.definition}
                        audio={term.audio}
                        img={term.img}
                        source={term.source}
                        entryID={term.entryID}
                        theme={term.theme}
                        secondary_theme={term.secondary_theme}
                        optional={term.optional}
                        compare_form={term.compare_form}
                        sort_form={term.sort_form}
                        sorting_form={term.sorting_form}
                      />
                    </Fragment>
                  );
                })}{' '}
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
          className={classNames(
            primaryCategory.icon ?? 'fv-categories',
            'text-3xl hover:opacity-75'
          )}
        />
        <div className="inline-flex text-lg font-medium">
          {primaryCategory.name}
        </div>
      </Link>
    );
  }

  function subcategories() {
    return (
      <>
        {subCategories.map((subCategory) => {
          return (
            <Link
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
                {subCategory.name}
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
