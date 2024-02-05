import { Outlet } from 'react-router-dom';
import '../../src/index.css';
const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
