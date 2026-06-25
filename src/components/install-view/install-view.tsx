export function InstallView() {
  return (
    <div data-testid="install-view" className="flex w-full justify-start p-4 mx-auto">
      <div className="flex flex-col w-full space-y-6">
        <div className="flex items-center space-x-2">
          <i className="fv-install text-3xl" />
          <div className="text-2xl font-bold">Install This App</div>
        </div>

        <div className="p-4 space-y-2 border-b-2 border-charcoal-200">
          <div className="text-lg font-bold">Android (Chrome)</div>
          <ol className="list-decimal list-inside space-y-1">
            <li>Tap the menu button in the top-right corner.</li>
            <li>
              Select <strong>Install app</strong> or <strong>Add to Home screen</strong>.
            </li>
            <li>Follow the on-screen prompts to confirm and install.</li>
          </ol>
        </div>

        <div className="p-4 space-y-2 border-b-2 border-charcoal-200">
          <div className="text-lg font-bold">iPhone / iPad (Safari)</div>
          <div className="italic text-charcoal-400 text-sm">Requires iOS 16.4 or later.</div>
          <ol className="list-decimal list-inside space-y-1">
            <li>Tap the menu button in the bottom-right corner.</li>
            <li>Tap the Share button(box with an upward arrow).</li>
            <li>
              Scroll down and choose <strong>Add to Home Screen</strong>.
            </li>
            <li>
              Confirm the name and tap <strong>Add</strong>.
            </li>
          </ol>
        </div>

        <div className="p-4 space-y-2 border-b-2 border-charcoal-200">
          <div className="text-lg font-bold">Desktop (Chrome, Edge, Brave)</div>
          <ol className="list-decimal list-inside space-y-1">
            <li>Open the app website in your browser.</li>
            <li>
              Look at the right side of the address bar for an install icon (often a computer screen with a downward
              arrow, or a plus sign).
            </li>
            <li>
              Click the icon and select <strong>Install</strong>.
            </li>
            <li>
              Alternatively, Click the menu, go to <strong>Apps</strong> or <strong>More Tools</strong>, and select{' '}
              <strong>Install</strong> [Site Name].
            </li>
          </ol>
        </div>

        <div className="p-4 space-y-2 border-b-2 border-charcoal-200">
          <div className="text-lg font-bold">macOS (Safari 17+)</div>
          <ol className="list-decimal list-inside space-y-1">
            <li>Open Safari and go to the app website.</li>
            <li>
              Go to the menu bar and select <strong>File &gt; Add to Dock</strong>.
            </li>
          </ol>
        </div>

        <p>
          Find more detailed instructions on how to install our app on your device here:{' '}
          <a
            href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/644579350"
            target="_blank"
            className="text-blue-800 hover:text-blue-900 underline"
            rel="noreferrer"
          >
            {' '}
            App Installation Instructions
          </a>
        </p>

        <div className="bg-gray-100 p-4 space-y-2 border-2 border-charcoal-200">
          <div className="font-bold">Having trouble installing the app?</div>
          <div>
            Let us know via our{' '}
            <a
              href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6"
              className="text-blue-800 hover:text-blue-900 underline"
              target="_blank"
              rel="noreferrer"
            >
              Help Desk.
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstallView
