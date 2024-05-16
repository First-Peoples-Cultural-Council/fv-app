import React from 'react';
import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

// FPCC
import ErrorView from '../common/error-view/error-view';

/* eslint-disable-next-line */
export interface ErrorPageProps {}

export function ErrorPage(props: ErrorPageProps) {
  const error = useRouteError();
  let errorMessage: string;
  let errorStatus: string = '';

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message ?? error.statusText;
    errorStatus = String(error?.status);
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <ErrorView
      errorHeader="Sorry, an unexpected error has occurred."
      errorMessage={errorMessage}
      errorStatus={errorStatus}
    />
  );
}

export default ErrorPage;
