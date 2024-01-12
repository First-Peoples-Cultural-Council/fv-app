import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { dataCategories } from '../temp-category-list';
import { useButtonStyle } from '../common/hooks';
import styles from './categories-view.module.css';

/* eslint-disable-next-line */
export interface CategoriesViewProps {}

export function CategoriesView(props: CategoriesViewProps) {
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');

  return (
    <div className="w-full">
      <div className="block md:hidden flex flex-wrap">
        {dataCategories
          .filter((category) => category.children)
          .map((category) => {
            return (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className={classNames(
                  'w-[150px] h-[150px] m-2 content-center grid grid-cols-1 cursor-pointer',
                  tertiaryButtonStyle
                )}
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
                      'text-3xl hover:opacity-75'
                    )}
                  />
                  <div className="pt-2 inline-flex ml-3 text-lg font-medium">
                    {category.title}
                  </div>
                </Link>
                {category.children?.map((subCategory) => {
                  return (
                    <Link
                      key={subCategory.id}
                      to={`/categories/${subCategory.id}`}
                      className={classNames(
                        'flex items-center cursor-pointer mb-6'
                      )}
                    >
                      <div className="pt-2 text-md pl-8 text-slate-600">
                        {subCategory.title}
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoriesView;
