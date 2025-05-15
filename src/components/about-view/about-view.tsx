import { ReactNode } from 'react'

// FPCC
import fpccLogo from '../../assets/images/fpccLogoColorWhite.svg'
import fpcfLogo from '../../assets/images/fpcfLogoWhite.svg'
import useSiteTitleFromManifest from '../../util/useSiteTitleFromManifest'

export interface AboutViewProps {
  children?: ReactNode
}

export function AboutView({ children }: Readonly<AboutViewProps>) {
  // Site information from manifest and hostname
  const origin = window.origin
  const hostnameParts = window.location.hostname.split('.')
  const subdomain = hostnameParts[0]
  const manifestUrl = `${origin}/assets/manifest.${subdomain}.json`
  const siteTitle = useSiteTitleFromManifest(manifestUrl)
  const siteURL = `https://www.firstvoices.com/${subdomain}/`
  const logoURL = `${origin}/${subdomain}/logo192.png`

  return (
    <div data-testid="AboutView" className="max-w-3xl mx-auto">
      <main className="p-4 sm:p-6 md:p-6 lg:p-8 text-center space-y-4">
        <div className="space-y-4">
          <h1 className="w-full text-center text-3xl mb-4">{siteTitle + ' App'}</h1>
          <img src={logoURL} alt="App logo" className="w-24 h-24 mx-auto" />
          <p className="text-lg">
            Browse words and phrases in the dictionary, practice with flashcards, bookmark content and more.
          </p>
        </div>
        {children}
        <div className="space-y-2">
          <p className="text-sm">
            Powered by the{' '}
            <a href={siteURL} className="text-blue-500 underline">
              {siteTitle} FirstVoices language site.
            </a>
          </p>
          <p className="text-sm">Compatible with iPhone, iPad, Android, Chromebook, Windows, and more.</p>
        </div>
      </main>
      <footer className="bg-charcoal-500 p-4">
        <p className="text-white text-center text-sm">An initiative of:</p>
        <div className="flex justify-center flex-wrap md:space-x-5 my-2">
          <a href="https://www.fpcc.ca/" target="_blank" rel="noreferrer">
            <img className="h-14" src={fpccLogo} alt="First People's Cultural Council Logo" loading="lazy" />
          </a>
          <a href="https://www.fpcf.ca/" target="_blank" rel="noreferrer">
            <img className="h-14" src={fpcfLogo} alt="First People's Cultural Foundation Logo" loading="lazy" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default AboutView
