import { RouterProvider } from 'react-router-dom';
import { routers } from './router';
import './assets/css/style.css'
import './assets/css/responsive.css'
import './assets/css/bootstrap.css'


function App() {
  return (
    <div className="App">
      <RouterProvider router={routers} />
    </div>
  );
}

export default App;
