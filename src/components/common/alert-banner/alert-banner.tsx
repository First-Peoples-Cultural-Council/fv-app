import { ALERT_TYPES } from 'constants/notification-types'

interface AlertBannerProps {
  alertType: keyof typeof ALERT_TYPES // Union of all alert types
  handleClose: () => void
  message: string
}

export function AlertBanner({ alertType, handleClose, message }: Readonly<AlertBannerProps>) {
  switch (alertType) {
    case ALERT_TYPES.SUCCESS:
      return (
        <div className="rounded-lg bg-green-50 p-4">
          <div className="flex">
            <div className="shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" className="fill-current h-5 w-5">
                <path d="M600 50a549.984 549.984 0 00-305.56 92.691 549.999 549.999 0 00-233.867 564.61 549.986 549.986 0 00432.13 432.13 549.977 549.977 0 00564.61-233.863 550.009 550.009 0 00-68.399-694.48c-103.14-103.14-243.04-161.09-388.91-161.09zm258 437L561 784a50.024 50.024 0 01-35 14.5 49.984 49.984 0 01-35.5-14.5l-150-150a49.993 49.993 0 01-14.789-35.5A49.99 49.99 0 01340.5 563c9.367-9.316 22.039-14.539 35.25-14.539s25.883 5.223 35.25 14.54l113.5 113.5 261.5-262a50.002 50.002 0 0170.5 0 50.002 50.002 0 0111.855 16.284 50.096 50.096 0 014.465 19.645 50.08 50.08 0 01-3.649 19.81A50.117 50.117 0 01858 487z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    data-testid="success-close-btn"
                    type="button"
                    onClick={handleClose}
                    className="inline-flex rounded-lg p-1.5 text-green-800 bg-green-50 border-green-800 focus:ring-green-600 focus:ring-offset-green-50"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    case ALERT_TYPES.ERROR:
      return (
        <div className="rounded-lg p-4 bg-red-50">
          <div className="flex">
            <div className="shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" className="fill-current h-5 w-5">
                <path d="M989 211A549.866 549.866 0 00759.75 73.66a550.006 550.006 0 00-508.49 101.192 550.003 550.003 0 00-198.434 478.99 550.032 550.032 0 0089.992 251.63 550.033 550.033 0 00197.97 179.51 550.026 550.026 0 00259.21 65.012c145.82.18 285.73-57.551 389-160.5a550.126 550.126 0 00119.48-178.55 550.03 550.03 0 000-421.4 550.026 550.026 0 00-119.48-178.55zM812 741.5c9.316 9.371 14.539 22.039 14.539 35.25S821.316 802.629 812 812c-9.363 9.316-22.039 14.539-35.25 14.539S750.871 821.316 741.5 812L600 670.5 458.5 812a49.978 49.978 0 01-35.25 14.539A49.986 49.986 0 01388 812a50.002 50.002 0 010-70.5L529.5 600 388 458.5a50.01 50.01 0 012.621-67.879A50.007 50.007 0 01458.5 388L600 529.5 741.5 388a50.091 50.091 0 0116.199-12.488 50.036 50.036 0 0119.852-4.953 49.954 49.954 0 0120.164 3.41 49.926 49.926 0 0117.121 11.2 50.074 50.074 0 0111.199 17.116 50.092 50.092 0 013.406 20.168 49.94 49.94 0 01-4.957 19.844A50.003 50.003 0 01812 458.5L670.5 600z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    data-testid="error-close-btn"
                    type="button"
                    onClick={handleClose}
                    className="inline-flex rounded-lg p-1.5 text-red-800 bg-red-50 border-red-800 focus:ring-red-600 focus:ring-offset-red-50"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    case ALERT_TYPES.WARNING:
      return (
        <div className="rounded-lg p-4 bg-yellow-50">
          <div className="flex">
            <div className="shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" className="fill-current h-5 w-5">
                <path d="M1072.5 933L734 256.5a149.97 149.97 0 00-55.297-60.285c-23.656-14.586-50.906-22.309-78.703-22.309s-55.039 7.723-78.699 22.309A149.979 149.979 0 00466 256.5L127.5 933a150.049 150.049 0 00-15.637 73.887 150.014 150.014 0 0022.348 72.137 149.96 149.96 0 0054.664 52.105A149.955 149.955 0 00262 1150h676a149.976 149.976 0 0073.129-18.871 149.98 149.98 0 0054.668-52.105 150.096 150.096 0 0022.344-72.137A149.967 149.967 0 001072.5 933zm-437 2.5A52.493 52.493 0 01600 950a50.079 50.079 0 01-19-4 50.003 50.003 0 01-16.5-10.5 50.061 50.061 0 01-10.945-16.273 50.033 50.033 0 010-38.457A50.014 50.014 0 01564.5 864.5 49.937 49.937 0 01581 854a50.056 50.056 0 0128.84-3.012A50 50 0 01635.5 864.5a49.812 49.812 0 0110.945 16.27c2.54 6.09 3.844 12.63 3.844 19.23s-1.305 13.137-3.844 19.227A49.874 49.874 0 01635.5 935.5zM650 750a50.004 50.004 0 01-50 50 50.007 50.007 0 01-35.355-14.645A50.01 50.01 0 01550 750V500a50 50 0 01100 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-800">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    data-testid="warning-close-btn"
                    type="button"
                    onClick={handleClose}
                    className="inline-flex rounded-lg p-1.5 text-yellow-800 bg-yellow-50 border-yellow-800 focus:ring-yellow-600 focus:ring-offset-yellow-50"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    case ALERT_TYPES.INFO:
    default:
      return (
        <div className="rounded-lg p-4 bg-blue-50">
          <div className="flex">
            <div className="shrink-0">
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 450 450"
                stroke="currentColor"
              >
                <path d="M225 0C100.74 0 0 100.74 0 225s100.74 225 225 225 225-100.74 225-225S349.26 0 225 0zm-26 322.12v-103a26 26 0 0152 0v103a26 26 0 01-52 0zm26-157.37a31.25 31.25 0 1131.25-31.25A31.25 31.25 0 01225 164.75z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-800">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    data-testid="info-close-btn"
                    type="button"
                    onClick={handleClose}
                    className="inline-flex rounded-lg p-1.5 text-blue-800 bg-blue-50 border-blue-800 focus:ring-blue-600 focus:ring-offset-blue-50"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg
                      className="fill-current h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
  }
}
