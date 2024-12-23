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
import Usuarios from './components/usuarios/Usuarios';
import { AuthProvider } from './components/auth/AuthContext';


function App() {
  return (
    <AuthProvider>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/organizaciones" element={<Organizaciones />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/organizaciones/:orgId/usuarios" element={<UsuariosList />} />
          <Route path="/organizaciones/:orgId/proyectos" element={<ProyectosList />} />
          <Route path="/proyectos/:proyectoId/planos" element={<PlanosList />} />
          <Route path="/redirect" element={<RedirectPage />} />
          <Route path='/usuarios' element={<Usuarios />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BaseLayout>
    </AuthProvider>
  );
}

export default App;
