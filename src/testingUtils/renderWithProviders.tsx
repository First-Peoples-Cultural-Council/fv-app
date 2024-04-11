import { render } from '@testing-library/react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from 'react';
import SearchProvider from '../components/search-provider';
import { AudioProvider } from '../components/contexts/audioContext';

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
    <SearchProvider>
      <AudioProvider>
        <Router initialEntries={['/initial']}>
          <Routes>
            <Route path="/initial" element={ui} />
          </Routes>
        </Router>
      </AudioProvider>
    </SearchProvider>,
    options
  );
};

export default customRender;
