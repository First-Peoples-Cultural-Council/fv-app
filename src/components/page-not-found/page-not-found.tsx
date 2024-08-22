// FPCC
import ErrorView from '../common/error-view/error-view'

export function PageNotFound() {
  return (
    <ErrorView
      errorHeader="Page not found"
      errorMessage="Sorry, we couldn’t find the page you’re looking for."
      errorStatus={404}
    />
  )
}

export default PageNotFound
