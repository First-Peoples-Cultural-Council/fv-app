import { useButtonStyle } from '@fv-app/common-components';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { dataCategories } from '../temp-category-list';

/* eslint-disable-next-line */
export interface CategoriesViewProps {}

export function CategoriesView(props: CategoriesViewProps) {
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');

  return (
    <div className={classNames('')}>
      <div className="block sm:hidden flex flex-wrap">
        {dataCategories
          .filter((category) => category.parent == null)
          .map((category) => {
            return (
              <Link
                to={`/categories/${category.id}`}
                className={classNames(
                  'w-[150px] h-[150px] m-2 content-center grid grid-cols-1 cursor-pointer',
                  tertiaryButtonStyle
                )}
              >
                <i
                  className={classNames(
                    category.icon ?? 'fv-categories',
                    'text-4xl'
                  )}
                />

                <div className="pt-2 text-sm">{category.name}</div>
              </Link>
            );
          })}
      </div>
      <div className="hidden sm:block">
        <div className="grid grid-cols-2 gap-2 lg:gap-3 lg:grid-cols-3 mt-5">
          {dataCategories
            .filter((category) => category.parent == null)
            .map((category) => {
              return (
                <div className='relative border-b-2 border-gray-200 pb-2 pl-4 block w-full overflow-hidden border-solid'>
                  <Link
                    to={`/categories/${category.id}`}
                    className={classNames(
                      'w-full rounded-lg inline-flex items-center hover:opacity-75'
                    )}
                  >
                    <i
                      className={classNames(
                        category.icon ?? 'fv-categories',
                        'text-3xl hover:opacity-75'
                      )}
                    />
                    <div className="pt-2 inline-flex ml-3 text-lg font-medium">{category.name}</div>
                  </Link>
                  {dataCategories
                    .filter((subCategory) => category.id === subCategory.parent)
                    .map((subCategory) => {
                      return (
                        <Link
                          to={`/categories/${subCategory.id}`}
                          className={classNames(
                            'flex items-center cursor-pointer mb-6'
                          )}
                        >
                          <div className="pt-2 text-md pl-8 text-slate-600">{subCategory.name}</div>
                        </Link>
                      );
                    })
                  }
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default CategoriesView;
