import { Header } from '@fv-app/common-components';
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <div className="max-h-[100vh] overflow-hidden">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
