import { useUser } from '../../context/UserContext';
import HeaderComponent from '../../components/Header/Header';
import './ClienteHome.css';

const ClientePedidos = () => {
  const { user } = useUser();

  return (
    <>
      <HeaderComponent nome={user.email} perfil={user.perfil} />

      <h2>Meus Pedidos</h2>;
    </>
  );
};

export default ClientePedidos;
