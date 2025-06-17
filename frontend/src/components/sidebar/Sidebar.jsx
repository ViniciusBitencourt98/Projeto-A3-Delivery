import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Image } from 'react-bootstrap';
import { BsBoxArrowRight } from 'react-icons/bs';
import './Sidebar.css';

export default function Sidebar({ perfil }) {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const optionsCliente = [
    { label: 'Home', icon: 'iconhome.svg', url: '/cliente' },
    { label: 'Perfil', icon: 'iconperfil.svg', url: '/cliente/perfil' },
    { label: 'Pedidos', icon: 'Iconpedidos.svg', url: '/cliente/pedidos' },
  ];

  const optionsRestaurante = [
    { label: 'Home', icon: 'iconhome.svg', url: '/restaurante' },
    { label: 'Perfil', icon: 'iconperfil.svg', url: '/restaurante/perfil' },
    { label: 'Cardápio', icon: 'Iconcardapio.svg', url: '/restaurante/cardapio' },
  ];

  const options = perfil === 'restaurante' ? optionsRestaurante : optionsCliente;

  return (
    <div
      className="sidebarstyle text-white vh-100 d-flex flex-column justify-content-between p-2"
      style={{ width: collapsed ? 80 : 250, transition: 'width 0.3s' }}
    >

      <div>
        <div className="d-flex justify-content-center mb-4">
          <Image
            src="/images/Avataruser.svg" // Avatar genérico
            roundedCircle
            width={collapsed ? 40 : 40}
            height={collapsed ? 40 : 40}
            alt="User Avatar"
          />
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="BtnNavBar"
          style={{ left: collapsed ? '58px' : '226px' }}
        >
          <img src={collapsed ? "/images/arroundMenu.svg" : "/images/Leftmenu.svg"}
            alt="Menu Toggle"
          />
        </button>

        <nav className="flex-column">
          {options.map((opt) => (
            <Link
              key={opt.label}
              to={opt.url}
              className="LabelNavbar d-flex align-items-center mb-4 text-white text-decoration-none"
            >
              <img src={`/images/${opt.icon}`} width={25} height={25} alt="" />
              {!collapsed && <span className="LabelNavbar ms-2">{opt.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Rodapé: Sair */}
      <div>
        <Nav.Link
          to="/"
          className="LabelNavbar d-flex align-items-center mb-2"
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/';
          }
          }
        >
          <img src="/images/IconSair.svg" width={25} height={25} alt="" />
          {!collapsed && <span className="LabelNavbar" style={{ color: 'var(--alerta)!important' }}>Sair</span>}
        </Nav.Link>
      </div>
    </div>
  );
}
