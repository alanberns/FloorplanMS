import 'bootstrap/dist/css/bootstrap.min.css';
import BaseLayout from './components/layout/BaseLayout';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Organizaciones from './components/organizaciones/Organizaciones';
import NotFound from './components/error/NotFound';


function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/organizaciones" element={<Organizaciones />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BaseLayout>
  );
}

export default App;
