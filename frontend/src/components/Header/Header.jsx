import './Header.css';


export const HeaderComponent = ({ nome, perfil }) => {
  return (
    <header className='HeaderComponent'>
      <h1>Seja bem vindo, {nome}</h1>
      {perfil === 'cliente' && (
        <img src="/images/Carrinho.svg" alt="Carrinho" width={18} height={18} />
      )}
      
    </header>
  );
};

export default HeaderComponent;