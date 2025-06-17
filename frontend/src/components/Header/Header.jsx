import './Header.css';
import { useCart } from '../../context/CartContext';


export const HeaderComponent = ({ nome, perfil }) => {
  
  const { toggleCart } = useCart();
  
  return (
    <header className='HeaderComponent'>
      <h1>Seja bem vindo, {nome}</h1>
      {perfil === 'cliente' && (
        <img src="/images/Carrinho.svg" alt="Carrinho" width={18} height={18}  onClick={toggleCart} />
      )}
      
    </header>
  );
};

export default HeaderComponent;