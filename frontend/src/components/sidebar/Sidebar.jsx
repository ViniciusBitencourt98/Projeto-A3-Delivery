import React, { useState } from 'react';
import { Nav, Button } from 'react-bootstrap';

export default function Sidebar({ perfil }) {
  const [collapsed, setCollapsed] = useState(false);

  const optionsCliente = ['Categorias', 'Meus Pedidos', 'Perfil'];
  const optionsRestaurante = ['Pedidos', 'Configurações', 'Perfil'];

  const options = perfil === 'restaurante' ? optionsRestaurante : optionsCliente;

  return (
    <div
      className="bg-dark text-white vh-100 p-3 d-flex flex-column"
      style={{ width: collapsed ? 80 : 250, transition: 'width 0.3s' }}
    >
      <Button
        variant="outline-light"
        size="sm"
        onClick={() => setCollapsed(!collapsed)}
        className="mb-3"
      >
        {collapsed ? '➤' : '⬅'}
      </Button>

      {!collapsed && (
        <Nav className="flex-column">
          {options.map((opt) => (
            <Nav.Link key={opt} href="#" className="text-white">
              {opt}
            </Nav.Link>
          ))}
        </Nav>
      )}
    </div>
  );
}
