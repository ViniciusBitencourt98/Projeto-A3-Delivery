import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { CartProvider } from './context/CartContext'; // Import do Carrinho
import ClienteHome from './pages/cliente/ClienteHome';
import ClientePedidos from './pages/cliente/ClientePedidos';
import ClientePerfil from './pages/cliente/ClientePerfil';
import RestauranteHome from './pages/restaurante/RestauranteHome';
import RestauranteCardapio from './pages/restaurante/RestauranteCardapio';
import RestaurantePerfil from './pages/restaurante/RestaurantePerfil';
import PaginaLogin from './pages/PaginaLogin/PaginaLogin';
import Sidebar from './components/sidebar/Sidebar';
import CartComponent from './components/carrinho/CarrinhoComponent'; // Import do Carrinho

const AppContent = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<PaginaLogin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="d-flex">
        <Sidebar perfil={user.perfil} />
        <div className="flex-grow-1 p-3">
          <Routes>
            {user.perfil === 'cliente' && (
              <>
                <Route path="/cliente" element={<ClienteHome />} />
                <Route path="/cliente/pedidos" element={<ClientePedidos />} />
                <Route path="/cliente/perfil" element={<ClientePerfil />} />
                <Route path="*" element={<Navigate to="/cliente" replace />} />
              </>
            )}

            {user.perfil === 'restaurante' && (
              <>
                <Route path="/restaurante" element={<RestauranteHome />} />
                <Route path="/restaurante/cardapio" element={<RestauranteCardapio />} />
                <Route path="/restaurante/perfil" element={<RestaurantePerfil />} />
                <Route path="*" element={<Navigate to="/restaurante" replace />} />
              </>
            )}
          </Routes>
        </div>

        {user.perfil === 'cliente' && ( // Só cliente vê o carrinho
          <CartComponent />
        )}
      </div>
    </Router>
  );
};

const App = () => (
  <UserProvider>
    <CartProvider> {/* Envolve tudo no provider do carrinho */}
      <AppContent />
    </CartProvider>
  </UserProvider>
);

export default App;
