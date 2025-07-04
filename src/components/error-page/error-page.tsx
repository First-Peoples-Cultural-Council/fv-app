import { useRouteError, isRouteErrorResponse } from 'react-router'

// FPCC
import ErrorView from 'components/common/error-view/error-view'

export function ErrorPage() {
  const error = useRouteError()
  let errorMessage: string = 'Unknown error'
  let errorStatus: string = ''

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error?.statusText
    errorStatus = String(error?.status)
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
  }

  return (
    <ErrorView
      errorHeader="Sorry, an unexpected error has occurred."
      errorMessage={errorMessage}
      errorStatus={errorStatus}
    />
  )
}

export default ErrorPage
