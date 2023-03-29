import { Header } from '@fv-app/common-components';
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <div className="">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
