import { Header, SearchHeader } from '@fv-app/common-components';
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <div>
      <Header />
      <SearchHeader
        title={'Dictionary'}
        backgroundColors={{
          to: 'to-color-words-light',
          from: 'from-color-words-dark',
        }}
      />
      <Outlet />
    </div>
  );
}

export default App;
