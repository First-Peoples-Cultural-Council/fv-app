import { render } from '@testing-library/react'
import { MemoryRouter as Router, Route, Routes } from 'react-router'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'

// FPCC
import { AudioProvider } from 'components/contexts/audioContext'

const customRender = (
  ui:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined,
  options = {}
) => {
  return render(
    <AudioProvider>
      <Router initialEntries={['/initial']}>
        <Routes>
          <Route path="/initial" element={ui} />
        </Routes>
      </Router>
    </AudioProvider>,
    options
  )
}

export default customRender
