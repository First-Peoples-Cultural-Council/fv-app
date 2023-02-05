import { ButtonTypeEnum, StandardButtonButtonTypeEnum } from '../data';
import Button from '../button/button';
import { noop } from 'lodash';

/* eslint-disable-next-line */
export interface PageNotFoundProps {}

export function PageNotFound(props: PageNotFoundProps) {
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
              <Button type={ButtonTypeEnum.Link} to="/">
                Go back home
              </Button>
              <Button
                onClick={noop}
                type={ButtonTypeEnum.button}
                buttonType={StandardButtonButtonTypeEnum.button}
                buttonStyle="button"
                secondary
              >
                Contact support
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PageNotFound;
