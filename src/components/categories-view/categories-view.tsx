import classNames from 'classnames';
import { Link } from 'react-router-dom';
import fetchCategoryData from '../../services/categoriesApiService';
import styles from './categories-view.module.css';
import { useEffect, useState } from 'react';
import { FvCategory } from '../common/data';
import { LoadingSpinner } from '../common/loading-spinner/loading-spinner';

/* eslint-disable-next-line */
export interface CategoriesViewProps {}

export function CategoriesView(props: CategoriesViewProps) {
  const [dataCategories, setDataCategories] = useState<FvCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryData().then((result) => {
      setDataCategories(result);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full">
      {loading && <LoadingSpinner />}
      <div
        className={classNames(
          'md:hidden flex justify-center flex-wrap overflow-y-auto',
          styles['scrollable-div']
        )}
      >
        {dataCategories
          .filter((category) => category.children)
          .map((category) => {
            return (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="w-40 h-40 m-2 content-center grid grid-cols-1 cursor-pointer bg-tertiaryB-500 text-white py-2 px-4 rounded shadow text-center"
              >
                <i className={classNames('fv-categories', 'text-4xl')} />

                <div className="pt-2 text-sm">{category.title}</div>
              </Link>
            );
          })}
      </div>
      <div className="hidden md:block">
        <div
          className={classNames(
            'overflow-y-auto grid grid-cols-2 gap-2 lg:gap-3 lg:grid-cols-3 mt-5',
            styles['categoryList']
          )}
        >
          {dataCategories.map((category) => {
            return (
              <div
                key={category.id}
                className="relative border-b-2 border-gray-200 pb-2 pl-4 block w-full overflow-hidden border-solid"
              >
                <Link
                  to={`/categories/${category.id}`}
                  className={classNames(
                    'w-full rounded-lg inline-flex items-center hover:opacity-75'
                  )}
                >
                  <i
                    className={classNames(
                      'fv-categories',
                      'text-3xl hover:opacity-75 text-tertiaryB-500'
                    )}
                  />
                  <div className="pt-2 inline-flex ml-3 text-lg font-medium">
                    {category.title}
                  </div>
                </Link>
                <div className="space-y-2 ml-6">
                  {category.children?.map((subCategory) => {
                    return (
                      <Link
                        key={subCategory.id}
                        to={`/categories/${subCategory.id}`}
                        className={classNames(
                          'flex items-center cursor-pointer p-3 text-md text-charcoal-400'
                        )}
                      >
                        {subCategory.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoriesView;
