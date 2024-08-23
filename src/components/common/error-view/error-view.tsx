import { Link } from 'react-router-dom'

export interface ErrorViewProps {
  errorStatus: string | number | null
  errorHeader: string | null
  errorMessage: string
}

export function ErrorView({ errorHeader, errorMessage, errorStatus }: Readonly<ErrorViewProps>) {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">{errorStatus}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-charcoal-500 sm:text-5xl">
          {errorHeader ?? 'Sorry, an unexpected error has occurred.'}
        </h1>
        <p className="mt-6 text-base leading-7 text-charcoal-400">{errorMessage}</p>

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
  )
}

export default ErrorView
