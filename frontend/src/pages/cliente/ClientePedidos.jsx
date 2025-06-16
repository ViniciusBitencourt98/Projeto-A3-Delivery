import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import HeaderComponent from '../../components/Header/Header';
import './ClientePedidos.css';
import CardsComponente from '../../components/Cards/Cards'

const ClientePedidos = () => {
  const { user } = useUser();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/pedidos/cliente/listar/${user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filtroCampo: 'usuario_id',
          })
        });
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) { // só busca se o usuário estiver carregado
      fetchPedidos();
    }
  }, [user]);

  return (
    <>
      <HeaderComponent nome={user.Nome} perfil={user.perfil} />

      <h2 className="TtilePage">Meus Pedidos</h2>

      <div className="ContainerPedidos">
        {loading ? (
          <p>Carregando pedidos...</p>
        ) : (
          pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <CardsComponente
                key={pedido.id}
                pedido={pedido}
                onClick={(id) => console.log("Pedido clicado:", id)}
              />
            ))
          ) : (
            <p>Você não tem pedidos ainda.</p>
          )
        )}
      </div>
    </>
  );
};

export default ClientePedidos;
