import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import PaginaLogin from './pages/PaginaLogin/PaginaLogin';
// import ClienteHome from './pages/ClienteHome';
// import RestauranteHome from './pages/RestauranteHome';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  const [user, setUser] = useState(null); // { perfil: 'cliente' | 'restaurante', nome, ... }

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={<PaginaLogin onLogin={setUser} />}
          />
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </Router>
    );
  }

  // Usuário logado, renderiza sidebar + home conforme perfil

  // return (
  //   <Router>
  //     <div className="d-flex">
  //       <Sidebar perfil={user.perfil} />

  //       <div className="flex-grow-1 p-3">
  //         <Routes>
  //           {user.perfil === 'cliente' && (
  //             <Route path="/cliente" element={<ClienteHome />} />
  //           )}
  //           {user.perfil === 'restaurante' && (
  //             <Route path="/restaurante" element={<RestauranteHome />} />
  //           )}
  //           <Route
  //             path="*"
  //             element={<Navigate to={user.perfil === 'cliente' ? '/cliente' : '/restaurante'} replace />}
  //           />
  //         </Routes>
  //       </div>
  //     </div>
  //   </Router>
  // );
}

export default App;
