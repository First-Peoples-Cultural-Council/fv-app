import { noop } from 'lodash';
import { Link } from 'react-router-dom';
import { useButtonStyle } from '../hooks/useButtonStyle';

/* eslint-disable-next-line */
export interface PageNotFoundProps {}

export function PageNotFound(props: PageNotFoundProps) {
  const primaryButtonStyle = useButtonStyle('primary');
  const secondaryButtonStyle = useButtonStyle('primary');
  return (
    <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-bold tracking-tight text-color-primary-0 sm:text-5xl">
            404
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link className={primaryButtonStyle} to="/">
                Go back home
              </Link>
              <button
                onClick={noop}
                type="button"
                className={secondaryButtonStyle}
              >
                Contact support
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PageNotFound;
