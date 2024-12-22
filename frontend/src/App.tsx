import 'bootstrap/dist/css/bootstrap.min.css';
import BaseLayout from './components/layout/BaseLayout';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Organizaciones from './components/organizaciones/Organizaciones';
import NotFound from './components/error/NotFound';
import Proyectos from './components/proyectos/Proyectos';
import ProyectosList from './components/proyectos/ProyectosList';
import UsuariosList from './components/usuarios/UsuariosList';
import PlanosList from './components/planos/PlanoList';
import RedirectPage from './components/auth/RedirectPage';


function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/organizaciones" element={<Organizaciones />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/organizaciones/:orgId/usuarios" element={<UsuariosList />} />
        <Route path="/organizaciones/:orgId/proyectos" element={<ProyectosList />} />
        <Route path="/proyectos/:proyectoId/planos" element={<PlanosList />} />
        <Route path="/redirect" element={<RedirectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BaseLayout>
  );
}

export default App;
