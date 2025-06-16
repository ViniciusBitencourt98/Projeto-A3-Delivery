import './Cards.css';
import { useUser } from '../../context/UserContext';
import BtnAction from '../Buttons/BtnAction';

export const CardsComponente = ({ pedido, onClick }) => {
  const { user } = useUser();

  // transforma string concatenada em array
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
            // aqui você pode colocar um componente de avaliação ou botão
            <span>Colocar componente de avaliação aqui</span>
          ) : (
            <span>Status: {pedido.status}</span>
          )
        ) : (
          <BtnAction onClick={() => onClick(pedido.pedido_id)} />
        )}
      </div>
    </div>
  );
};

export default CardsComponente;
