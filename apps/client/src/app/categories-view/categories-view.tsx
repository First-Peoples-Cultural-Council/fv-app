import { IconLabelButton, useButtonStyle } from '@fv-app/common-components';
import classNames from 'classnames';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { dataCategories } from '../temp-category-list';
import styles from './categories-view.module.css';

/* eslint-disable-next-line */
export interface CategoriesViewProps {}

export function CategoriesView(props: CategoriesViewProps) {
  const tertiaryButtonStyle = useButtonStyle('tertiary', 'button');

  return (
    <div className={classNames('flex flex-wrap')}>
      {dataCategories
        // .filter((category) => category.parent == null)
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
  );
}

export default CategoriesView;
