import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import HeaderComponent from '../../components/Header/Header';
import './RestauranteHome.css';
import CardsComponente from '../../components/Cards/Cards'

const RestauranteHome = () => {
    const { user } = useUser();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log("User:", user.id);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/v1/pedidos/cliente/listar/${user.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        filtroCampo: 'pedidos.restaurante_id',
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

    const handleStatusUpdate = async (pedidoId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/pedidos/restaurante/status/${pedidoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Entregue' }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar status do pedido');
            }


            setPedidos((prevPedidos) =>
                prevPedidos.map((p) =>
                    p.pedido_id === pedidoId ? { ...p, status: 'Entregue' } : p
                )
            );
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar status do pedido.');
        }
    };

    return (
        <>
            <HeaderComponent nome={user.Nome} perfil={user.perfil} />

            <div className="containerValor">
                <div className="cardValor cardVerde">
                    <h3>Total Vendido</h3>
                    <p>R$ {pedidos.reduce((total, pedido) => total + pedido.valor_total, 0).toFixed(2)}</p>
                </div>

                <div className="cardValor cardAmarelo">
                    <h3>Quantidade de Vendas</h3>
                    <p>{pedidos.length}</p>
                </div>
            </div>

            <div className="ContainerPedidos">
                {loading ? (
                    <p>Carregando pedidos...</p>
                ) : (
                    pedidos.length > 0 ? (
                        pedidos.map((pedido) => (
                            <CardsComponente
                                key={pedido.pedido_id}
                                pedido={pedido}
                                onClick={handleStatusUpdate}
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

export default RestauranteHome;
