import './Cards.css';
import { useUser } from '../../context/UserContext';
import BtnAction from '../Buttons/BtnAction';
import AvaliacaoComponent from '../Avaliacao/Avaliacao';

export const CardsComponente = ({ pedido, onClick }) => {
  const { user } = useUser();

  
  const itensArray = pedido.itens_nome ? pedido.itens_nome.split(', ') : [];

  return (
    <div className='CardContainer'>
      <div className='ContainerTitleCard'>
        <span className='TitleCard'>Pedido</span>
        <span className='TitleCard'># {pedido.pedido_id}</span>
      </div>

      <div className='ContainerValor'>
        <span className='SpanMoeda'>R$</span>
        <span className='Spanvalor'>{pedido.valor_total.toFixed(2)}</span>
      </div>

      <div className='ConteinerItens'>
        <span className='TitleItens'>Itens:</span>
        {itensArray.map((item, index) => (
          <div key={index} className='LinhaIten'>
            <img src="/images/IconItensLista.svg" alt="" /> {item}
          </div>
        ))}
      </div>


      <div className='ContainerAction'>
        {user.perfil === 'cliente' ? (
          pedido.status === 'Entregue' ? (
            <AvaliacaoComponent
              pedidoId={pedido.pedido_id}
              notaInicial={pedido.nota_avaliacao}
            />
          ) : (
            <span
              className={`TagStatus ${pedido.status === 'pendente' ? 'TagPendente' : 'TagOutro'
                }`}
            >
              {pedido.status}
            </span>
          )
        ) : (
          pedido.status === 'pendente' ? (
            <BtnAction
              label="Entregar"
              onClick={() => onClick(pedido.pedido_id)}
            />
          ) : (
            <BtnAction
              label="Entregue"
              style={{
                background: 'var(--secundaria)',
                color: 'var(--texto-primario)'
              }}
              onClick={() => onClick(pedido.pedido_id)}
            />
          )
        )}
      </div>


    </div>
  );
};

export default CardsComponente;
