import { Header, SearchHeader } from '@fv-app/common-components';
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
