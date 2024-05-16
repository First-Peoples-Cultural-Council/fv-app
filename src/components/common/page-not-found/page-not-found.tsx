import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface PageNotFoundProps {}

export function PageNotFound(props: PageNotFoundProps) {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-fv-charcoal sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-fv-charcoal-light">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link className="btn-contained" to="/">
            Go back home
          </Link>
          <a
            href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outlined"
          >
            Contact support
          </a>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
